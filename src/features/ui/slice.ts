import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "model/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { movieEndpoints } from "features/apiCalls/movieEndpoints";

const initialState: UiState = {
    page: 1,
    totalPages: 0,
    totalResults: 0,
    expandedNav: "homepage",
    genres: [],
    showNavbar: false,
    isMobile: false,
};

const { getMediaLists: getMoviesApi, getMediaReviews } =
    movieEndpoints.endpoints;

export const slice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setSearchPage: (state, { payload }: PayloadAction<number>) => {
            state.page = payload;
        },
        setTotalPages: (state, { payload }: PayloadAction<number>) => {
            state.totalPages = payload;
        },
        setTotalResults: (state, { payload }: PayloadAction<number>) => {
            state.totalResults = payload;
        },
        setExpandedNav: (state, { payload }: PayloadAction<string>) => {
            state.expandedNav = payload;
        },
        _setGenres: (state, { payload }) => {
            state.genres = payload;
        },
        setShowNavbar: (state, { payload }) => {
            state.showNavbar = payload;
        },
        setIsMobile: (state, { payload }) => {
            state.isMobile = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(getMoviesApi.matchFulfilled, (state, { payload }) => {
                state.totalPages = payload.total_pages || 0;
                state.totalResults = payload.total_results || 0;
            })
            .addMatcher(getMediaReviews.matchFulfilled, (state, { payload }) => {
                state.totalPages = payload.total_pages || 0;
                state.totalResults = payload.total_results || 0;
            });
    },
});

export default slice.reducer;
