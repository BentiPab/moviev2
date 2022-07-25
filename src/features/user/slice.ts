import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersState } from "../../model/models";
import { UserDetails } from "./../../model/models";
import { userEndpoints } from "./../apiCalls/userEndpoints";

const initialState: UsersState = {
  favoriteMovies: [],
  favoriteTvShows: [],
  createdLists: [],
  tvWatchLists: [],
  moviesWatchLists: [],
};

const {
  getCreatedLists,
  getFavoriteMovies,
  getFavoriteTvShows,
  getMoviesWatchList,
  getTvWatchLists,
} = userEndpoints.endpoints;

export const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    _setUser: (state, { payload }: PayloadAction<UserDetails | undefined>) => {
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = undefined;
      state.createdLists = [];
      state.favoriteMovies = [];
      state.tvWatchLists = [];
      state.moviesWatchLists = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getFavoriteMovies.matchFulfilled, (state, { payload }) => {
        state.favoriteMovies = payload.results
      })
      .addMatcher(getFavoriteTvShows.matchFulfilled, (state, { payload }) => {
        state.favoriteTvShows = payload.results
      })
      .addMatcher(getCreatedLists.matchFulfilled, (state, { payload }) => {
        state.createdLists = payload.results;
      })
      .addMatcher(getMoviesWatchList.matchFulfilled, (state, { payload }) => {
        state.moviesWatchLists = payload.results;
      })
      .addMatcher(getTvWatchLists.matchFulfilled, (state, { payload }) => {
        state.tvWatchLists = payload.results;
      });
  },
});

export default slice.reducer;
