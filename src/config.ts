import { AppConfig } from "./model/models";

const safeEnv = (key: string, defaultValue?: string): string => {
  const value: string = process.env[key] || "";
  const result: any = value || defaultValue;

  if (result === undefined) {
    throw new Error(`Missing key in .env file: ${key}`);
  }

  return result;
};

const appConfig: AppConfig = {
  app: {
    name: safeEnv("REACT_APP_NAME", ""),
    version: safeEnv("REACT_APP_VERSION", ""),
  },
  api: {
    url: safeEnv("REACT_APP_API_URL"),
    key: safeEnv("REACT_APP_API_KEY", ""),
  },
  env: safeEnv("NODE_ENV", "development"),
  login: {
    url: safeEnv("REACT_APP_LOGIN_URL", ""),
    redirect: safeEnv("REACT_APP_LOGIN_REDIRECT_URL", ""),
  },
  userCountry: {
    url: safeEnv("REACT_APP_USER_COUNTRY_URL", ""),
  },
  token: {
    key: safeEnv("REACT_APP_SECRET_TOKEN", "")
  }
};

export default appConfig;
