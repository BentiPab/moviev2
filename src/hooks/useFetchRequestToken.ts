import { useSelector } from "react-redux";
import { selectRequestToken } from "features/auth/selectors";
import { useEffect } from "react";
import { isTokenExpired } from "utils/token";
import useThunkDispatch from "./useThunkDispatch";

const useFetchRequestToken = () => {
  const requestToken = useSelector(selectRequestToken);
  const dispatch = useThunkDispatch();
  const isExpired = requestToken && isTokenExpired(requestToken.expires_at);

  useEffect(() => {
    if (!requestToken || isExpired) {
      //dispatch(appActions.fetchRequestToken());
    }
  }, [isExpired, requestToken, dispatch]);
};

export default useFetchRequestToken;
