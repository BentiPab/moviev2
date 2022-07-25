import { NavLinkType } from "model/models";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import HomeIcon from "@mui/icons-material/Home";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import PersonIcon from "@mui/icons-material/Person";
import appConfig from "config";
import { getIntersessionRequestToken } from "./intersession";

export const getLoginPath = () => {
    const reqToken = getIntersessionRequestToken();
    return `${appConfig.login.url}${reqToken}${appConfig.login.redirect}`;
};

export const navLinks: NavLinkType[] = [
    {
        label: "homepage",
        value: "homepage",
        icon: <HomeIcon color="primary" />,
    },
    {
        label: "movies",
        value: "movie",
        sublinks: [
            {
                label: "now playing",
                path: "media/movie/now-playing",
                value: "now_playing",
                auth: true,
                guest: true,
            },
            {
                label: "popular",
                path: "media/movie/popular",
                value: "popular",
                auth: true,
                guest: true,
            },
            {
                label: "top rated",
                path: "media/movie/top-rated",
                value: "top_rated",
                auth: true,
                guest: true,
            },
            {
                label: "upcoming",
                path: "media/movie/upcoming",
                value: "upcoming",
                auth: true,
                guest: true,
            },
        ],
        icon: <LocalMoviesIcon color="primary" />,
        expandable: true,
    },
    {
        label: "tv shows",
        value: "tv",
        sublinks: [
            {
                label: "airing today",
                path: "media/tv/airing-today",
                value: "airing_today",
                auth: true,
                guest: true,
            },
            {
                label: "on the air",
                path: "media/tv/on-the-air",
                value: "on_the_air",
                auth: true,
                guest: true,
            },
            {
                label: "popular",
                path: "media/tv/popular",
                value: "popular",
                auth: true,
                guest: true,
            },
            {
                label: "top rated",
                path: "media/tv/top-rated",
                value: "top_rated",
                auth: true,
                guest: true,
            },
        ],
        icon: <LiveTvIcon color="primary" />,
        expandable: true,
    },
    {
        label: "my account",
        value: "account",
        sublinks: [
            { label: "details", path: "account/details", auth: true, guest: false },
            {
                label: "my favorites",
                path: "account/favorites",
                auth: true,
                guest: false,
            },
            {
                label: "my watchlists",
                path: "account/watchlists",
                auth: true,
                guest: false,
            },
            { label: "logout", path: "account/logout", auth: true, guest: false },
            { label: "login", path: "account/login", auth: false, guest: true },
        ],
        icon: <PersonIcon color="primary" />,
        expandable: true,
    },
];
