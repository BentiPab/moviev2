import appConfig from "../config";
import { history } from "./history";
import { navLinks } from "./navbar";

export type NewParamsType = {
    [key: string]: string | number;
};

const baseQuery: NewParamsType = { api_key: appConfig.api.key };

export const getBuiltPath = (path: string, newParams?: NewParamsType) => {
    Object.assign(baseQuery, newParams);
    const searchParams = Object.keys(baseQuery)
        .map((key, index) =>
            index === 0 ? `?${key}=${baseQuery[key]}` : `${key}=${baseQuery[key]}`
        )
        .join("&");
    getCurrentList();
    return path.concat(searchParams);
};

export const getCurrentList = () => {
    const {
        location: { pathname },
    } = history;
    const formattedPath = pathname.slice(1);
    const found = navLinks
        .map((link) => {
            return link.sublinks?.find(({ path }) => {
                return path === formattedPath;
            })?.value;
        })
        .filter((value) => value)[0];
    return found
};
