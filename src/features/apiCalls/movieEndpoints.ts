import { moviesApi } from "./apiCalls";
import { getBuiltPath, NewParamsType } from "./../../utils/path";
import {
  BaseDataList,
  Credits,
  FormattedProvider,
  FullMediaData,
  MediaListsRoutes,
  ReviewList,
  TvList,
} from "model/models";
import { formatMovies, formatTv, formatTvToFullMedia } from "utils/media";
import { CountryWatchProviders } from "./../../model/models";
import { getRegion } from "utils/intersession";
import { formatProviders } from "./../../utils/media";

export const movieEndpoints = moviesApi.injectEndpoints({
  endpoints: (build) => ({
    getMediaLists: build.query<
      BaseDataList,
      { type: string; params: NewParamsType; list: MediaListsRoutes }
    >({
      query: ({ type, params, list }) =>
        getBuiltPath(`${type}/${list}`, params),
      transformResponse: (res: BaseDataList, meta, { type }) =>
        type === "movie" ? formatMovies(res) : formatTv(res as TvList),
    }),
    getMediaDetails: build.query<
      FullMediaData,
      { type: string; mediaId: string }
    >({
      query: ({ type, mediaId }) => getBuiltPath(`/${type}/${mediaId}`),
      transformResponse: (res: BaseDataList, meta, { type }) =>
        type === "movie" ? res : formatTvToFullMedia(res),
    }),
    getMediaReviews: build.query<
      ReviewList,
      { type: string; mediaId: string; page: number }
    >({
      query: ({ type, mediaId, page }) =>
        getBuiltPath(`/${type}/${mediaId}/reviews`, { page }),
    }),
    getWatchProviders: build.query<
      FormattedProvider[] | undefined,
      { type: string; mediaId: string }
    >({
      query: ({ type, mediaId }) =>
        getBuiltPath(`/${type}/${mediaId}/watch/providers`),
      transformResponse: (res: {
        id: number;
        results: CountryWatchProviders;
      }) => {
        const { countryCode } = getRegion() || { countryCode: "US" };
        const watchProviders = res.results[countryCode];
        console.log(res.results[countryCode]);
        return !!watchProviders ? formatProviders(watchProviders) : undefined;
      },
    }),
    getMediaCredits: build.query<Credits, { type: string; mediaId: string }>({
      query: ({ type, mediaId }) => getBuiltPath(`/${type}/${mediaId}/credits`),
    }),
  }),
});

export const {
  useLazyGetMediaListsQuery,
  useGetMediaDetailsQuery,
  useLazyGetMediaReviewsQuery,
  useGetWatchProvidersQuery,
  useGetMediaCreditsQuery,
} = movieEndpoints;
