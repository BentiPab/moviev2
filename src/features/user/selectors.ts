import { RootState } from "../../model/models";
import { createSelector } from "@reduxjs/toolkit";

export const selectUser = (state: RootState) => state.users.user;

export const selectUsername = (state: RootState) => state.users.user?.username;

export const selectFavoriteMovies = (state: RootState) =>
    state.users.favoriteMovies;

export const selectFavoriteTvShows = (state: RootState) =>
    state.users.favoriteTvShows;

export const selectAllFavorites = createSelector(
    selectFavoriteMovies,
    selectFavoriteTvShows,
    (movies, tv) =>
        movies?.length ? movies?.concat(tv || []) : tv?.length ? tv : []
);

export const selectIsFavoriteMedia = (mediaId: number) =>
    createSelector(selectAllFavorites, (favs) =>
        favs.length ? favs.some((fav) => fav.id === mediaId) : false
    );
