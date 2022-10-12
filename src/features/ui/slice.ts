import { createSlice } from "@reduxjs/toolkit";
import { UiState } from "model/models";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: UiState = {
  expandedNav: "homepage",
  genres: [],
  showNavbar: false,
};

export const slice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setExpandedNav: (state, { payload }: PayloadAction<string>) => {
      state.expandedNav = payload;
    },
    _setGenres: (state, { payload }) => {
      state.genres = payload;
    },
    setShowNavbar: (state, { payload }) => {
      state.showNavbar = payload;
    },
  },
});

export default slice.reducer;
