import {
  BaseDataList,
  FormattedProvider,
  MediaType,
  TvList,
  WatchProviders,
} from "model/models";
import { WatchProvider } from "./../model/models";
import _, { sortBy, uniqBy } from "lodash";
import castAvatar from "../assets/predifinedPoster.png";

export const getImagePath = (
  url?: string,
  original?: boolean,
  casting?: boolean
) => {
  if (!url) {
    return casting ? castAvatar : "";
  }
  if (original) {
    return `https://image.tmdb.org/t/p/original${url}`;
  }
  return `https://image.tmdb.org/t/p/w154${url}`;
};

export const formatMovies = (res: BaseDataList) => {
  const newResults = res.results.map(({ ...rest }) => ({
    ...rest,
    type: "movie" as MediaType,
  }));
  return { ...res, results: newResults };
};

export const formatTv = (res: TvList) => {
  const newResults = res.results.map(
    ({ name, original_name, first_air_date, ...rest }) => ({
      ...rest,
      title: name,
      original_title: original_name,
      adult: false,
      release_date: first_air_date,
      type: "tv" as MediaType,
    })
  );
  return { ...res, results: newResults };
};

export const formatTvToFullMedia = (media: any) => {
  return {
    ...media,
    title: media.name,
    original_title: media.original_name,
    adult: false,
    release_date: media.first_air_date,
    type: "tv" as MediaType,
  };
};

export const getTitleToUrl = (title: string): string =>
  title
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(" ")
    .join("-")
    .toLowerCase();

export const getYear = (date: string) =>
  new Date(date).getFullYear().toString();

const mapProviders = (providers?: WatchProvider[]) =>
  providers
    ? providers.map((provider) => ({
        id: provider.provider_id,
        path: provider.logo_path,
        name: provider.provider_name,
        order: provider.display_priority,
      }))
    : [];

export const formatProviders = (providers: WatchProviders) => {
  const buyProviders = mapProviders(providers?.buy);
  const streamProviders = mapProviders(providers?.flatrate);
  const rentProviders = mapProviders(providers?.rent);

  const uniqProviders = uniqBy(
    [...buyProviders, ...streamProviders, ...rentProviders],
    "id"
  );

  const finalProviders = uniqProviders.reduce((accum, provider) => {
    const buy =
      buyProviders && !!buyProviders.find((prov) => prov.id === provider.id);
    const rent =
      rentProviders && !!rentProviders.find((prov) => prov.id === provider.id);
    const stream =
      streamProviders &&
      !!streamProviders.find((prov) => prov.id === provider.id);
    const { id, ...rest } = provider;

    return [...accum, { ...rest, buy, rent, stream }];
  }, [] as FormattedProvider[]);

  return sortBy(finalProviders, "order");
};

export const paginateData = <T>(
  items: T[],
  pageNumber: number,
  pageSize: number = 10
) =>
  _(items)
    .slice(0)
    .take(pageSize * pageNumber)
    .value();
