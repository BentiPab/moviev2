import appConfig from "config";
import {
    AddedFavoriteResponse,
    AddFavoriteBody,
    BaseDataList,
    CreatedLists,
    TvList,
    UserDetails,
} from "model/models";
import { moviesApi } from "./apiCalls";
import { getBuiltPath } from "../../utils/path";
import { getIntersessionSessionId, getRegion } from "utils/intersession";
import { formatMovies, formatTv } from './../../utils/media';

const accountPath = (id: number) => `account/${id}/`;

const userRoutes = {
    details: (sessionId: string) =>
        `account?api_key=${appConfig.api.key}&session_id=${sessionId}`,
    createdLists: (id: number) => `${accountPath(id)}lists`,
    favoriteMovies: (id: number) => `${accountPath(id)}favorite/movies`,
    favoriteTvShows: (id: number) => `${accountPath(id)}favorite/tv`,
    addToFavs: (id: number) => `${accountPath(id)}favorite`,
    moviesWatchList: (id: number) => `${accountPath(id)}watchlist/movies`,
    tvShowsWatchList: (id: number) => `${accountPath(id)}watchlist/tv`,
};


const baseParams = () => ({
    session_id: getIntersessionSessionId(),
    language: getRegion().language
});

export const userEndpoints = moviesApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDetails: build.query<UserDetails, void>({
            query: () => {
                const sessionId = getIntersessionSessionId()
                return userRoutes.details(sessionId);
            },
        }),
        getCreatedLists: build.query<CreatedLists, number>({
            query: (id) => {
                const path = userRoutes.createdLists(id);
                return getBuiltPath(path, baseParams());
            },
        }),
        getFavoriteMovies: build.query<BaseDataList, number>({
            query: (id) => {
                const path = userRoutes.favoriteMovies(id);
                return getBuiltPath(path, baseParams());
            },
            transformResponse: (res: BaseDataList) => formatMovies(res),
        }),
        getFavoriteTvShows: build.query<BaseDataList, number>({
            query: (id) => {
                const path = userRoutes.favoriteTvShows(id);
                return getBuiltPath(path, baseParams());
            },
            transformResponse: (res: TvList) => formatTv(res),
        }),
        addToFavorites: build.mutation<AddedFavoriteResponse, AddFavoriteBody>({
            query: ({ id, media_id, media_type, favorite }) => {
                const path = userRoutes.addToFavs(id);
                return {
                    method: "POST",
                    url: getBuiltPath(path, baseParams()),
                    body: {
                        media_id,
                        media_type,
                        favorite,
                    },
                };
            },
        }),
        getMoviesWatchList: build.query<BaseDataList, number>({
            query: (id) => {
                const path = userRoutes.moviesWatchList(id);

                return getBuiltPath(path, baseParams());
            },
            transformResponse: (res: BaseDataList) => formatMovies(res)
        }),
        getTvWatchLists: build.query<BaseDataList, number>({
            query: (id) => {
                const path = userRoutes.tvShowsWatchList(id);

                return getBuiltPath(path, baseParams());
            },
            transformResponse: (res: TvList) => formatTv(res)
        }),
    }),
});

export const {
    useAddToFavoritesMutation,
    useLazyGetUserDetailsQuery,
    useLazyGetFavoriteMoviesQuery,
    useLazyGetFavoriteTvShowsQuery,
    useLazyGetMoviesWatchListQuery,
    useLazyGetTvWatchListsQuery,
    useLazyGetCreatedListsQuery
} = userEndpoints;
