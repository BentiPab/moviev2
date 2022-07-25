import appConfig from "../../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${appConfig.api.url}` }),
  endpoints: () => ({}),
});

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (build) => ({
    getUserCountry: build.query<
      { country_name: string; country_code: string },
      void
    >({
      query: () => `${appConfig.userCountry.url}`,
    }),
  }),
});

export const { useGetUserCountryQuery } = appApi;
