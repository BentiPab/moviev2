import appConfig from "config";
import { selectRequestToken } from "features/auth/selectors";
import { useSelector } from "react-redux";

const useRedirectLoginLink = () => {
  const requestToken = useSelector(selectRequestToken)?.request_token;

  return `${appConfig.login.url}${requestToken}${appConfig.login.redirect}`;
};

export default useRedirectLoginLink;
