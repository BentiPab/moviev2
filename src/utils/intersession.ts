import { AppState, RequestToken, SessionId } from "model/models";
import { decodeToken, generateEncode } from './auth';


const REQ_TOKEN = "request-token";
const SESS_ID = "x-auth-token";
const COMMON = "common_data";

export const setIntersessionRequestToken = (token: RequestToken) => {

  window.localStorage.setItem(REQ_TOKEN, JSON.stringify(token));
}

export const getIntersessionRequestToken = () => {
  const token = window.localStorage.getItem(REQ_TOKEN);
  return token ? JSON.parse(token).request_token : undefined;
};

export const removeIntersessionRequestToken = () =>
  window.localStorage.removeItem(REQ_TOKEN);

export const setIntersessionSessionId = (sessionId: SessionId) => {
  window.localStorage.setItem(SESS_ID, generateEncode(JSON.stringify(sessionId)));
};

export const removeIntersessionSessionId = () => {
  window.localStorage.removeItem(SESS_ID);
};

export const getIntersessionSessionId = (): SessionId["session_id"] => {
  const token = window.localStorage.getItem(SESS_ID);

  if (!!token) {
    const decodedToken: SessionId = decodeToken(token)
    return decodedToken.session_id
  }

  return '';
};

export const setRegion = (region: AppState) =>
  window.localStorage.setItem(COMMON, JSON.stringify(region));

export const getRegion = (): AppState => {
  const region = window.localStorage.getItem(COMMON)

  if (region) {
    return JSON.parse(region) as AppState
  }

  return {
    language: "en-US",
    country: "United States",
    countryCode: "US",
  }
}