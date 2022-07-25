import errorsActions from "features/errors/actions";
import notificationsActions from "features/notifications/actions";
import store from "features/store";
import { ErrorOrigin, HttpError, HttpErrorCode } from "model/models";

const SUCCESS_CODES = [200, 201];

const getCommonHeaders = () => {
  return {
    accept: "application/json",
  };
};

let notificationErrorCount: number = 1;
const LIMIT_COUNT: number = 5;
const openNotification = (countEnabled: boolean) => {
  if (countEnabled) {
    notificationErrorCount === LIMIT_COUNT
      ? (notificationErrorCount = 1)
      : notificationErrorCount++;
  }

  return notificationErrorCount === 1;
};

const isJsError = (error: unknown): error is Error => error instanceof Error;

const isHttpError = (error: unknown): error is HttpError =>
  typeof error === "object" &&
  error !== null &&
  "status" in error &&
  "message" in error &&
  "internalUrl" in error &&
  "origin" in error &&
  "externalUrl" in error;

const decodeStatus = (status: string | number): HttpErrorCode => {
  const statusNumber = Number(status);

  switch (statusNumber) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 405:
    case 408:
    case 500:
      return statusNumber;
    default:
      return 500;
  }
};

const decodeOrigin = (origin: string | undefined): ErrorOrigin => {
  switch (origin) {
    case "internal-api":
    case "internal-ui":
    case "external":
    case "WCS":
    case "unknown":
      return origin;
    default:
      return "unknown";
  }
};

const decodeRes = (res: Response) =>
  res.json().catch((error: Error) => {
    const httpError: HttpError = {
      status: SUCCESS_CODES.includes(res.status)
        ? 500
        : decodeStatus(res.status),
      message: SUCCESS_CODES.includes(res.status)
        ? `The API response is not a valid JSON: ${error.message}`
        : res.statusText,
      internalUrl: res.url,
      externalUrl: "",
      origin: "internal-api",
      stack: "",
    };
    return httpError;
  });

const handleFetchError = (
  countEnabled: boolean,
  error: unknown,
  nonBlockingErrorKey?: string,
  nonBlockingAutoCloseDelay?: number
) => {
  // catch error in previous code
  return nonBlockingErrorKey
    ? openNotification(countEnabled)
      ? store.dispatch(
          notificationsActions.addNotification({
            type: "error",
            message: nonBlockingErrorKey,
            autoClose: true,
            errorType: "http",
            messageIsLabelKey: true,
            autoCloseDelay: nonBlockingAutoCloseDelay,
          })
        )
      : undefined
    : isHttpError(error)
    ? store.dispatch(errorsActions.setHttpError(error))
    : isJsError(error)
    ? store.dispatch(errorsActions.setUiError(error))
    : store.dispatch(
        errorsActions.setUiError(new Error("Unknown error in fetchJson"))
      );
};

const fetchJson = <T>(
  input: RequestInfo,
  init?: RequestInit,
  nonBlockingErrorKey?: string,
  countEnabled: boolean = false,
  nonBlockingAutoCloseDelay?: number,
  notBlockingError403: boolean = false
) => {
  return window
    .fetch(
      input,
      Object.assign(
        {
          headers: getCommonHeaders(),
        },
        init || {}
      )
    )
    .then((res) => {
      const decodedRes = decodeRes(res);

      return decodedRes.then((decodedRes: any) => {
        if (decodeStatus(res.status) === 403 && notBlockingError403) {
          return undefined;
        }

        if (isHttpError(decodedRes)) {
          return nonBlockingErrorKey
            ? openNotification(countEnabled)
              ? store.dispatch(
                  notificationsActions.addNotification({
                    type: "error",
                    message: nonBlockingErrorKey,
                    autoClose: true,
                    errorType: "http",
                    messageIsLabelKey: true,
                    autoCloseDelay: nonBlockingAutoCloseDelay,
                  })
                )
              : undefined
            : store.dispatch(errorsActions.setHttpError(decodedRes));
        }

        if (!SUCCESS_CODES.includes(res.status)) {
          const httpError: HttpError = {
            message: res.statusText,
            internalUrl: res.url,
            externalUrl: "",
            stack: "",
            nonBlockingErrorKey: nonBlockingErrorKey,
            ...decodedRes,
            status: decodeStatus(res.status),
            origin: decodeOrigin(decodedRes.origin),
          };
          return nonBlockingErrorKey
            ? openNotification(countEnabled)
              ? store.dispatch(errorsActions.setHttpError(httpError))
              : undefined
            : store.dispatch(errorsActions.setHttpError(httpError));
        }
        // Everything's fine
        notificationErrorCount = 1;
        return decodedRes as T;
      });
    })
    .catch((error: unknown) => {
      handleFetchError(
        countEnabled,
        error,
        nonBlockingErrorKey,
        nonBlockingAutoCloseDelay
      );
    });
};

export default fetchJson;
