import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "model/models";

export const selectTotalResults = (state: RootState) => state.ui.totalResults;

export const selectTotalPages = (state: RootState) => state.ui.totalPages;

export const selectPage = (state: RootState) => state.ui.page;

export const selectPagination = createSelector(
    selectPage,
    selectTotalPages,
    selectTotalResults,
    (page, totalPages, totalResults) => ({ page, totalPages, totalResults })
);

export const selectExpandedNav = (nav: string) => (state: RootState) =>
    state.ui.expandedNav === nav;

export const selectShowNavbar = (state: RootState) => state.ui.showNavbar

export const selectIsMobile = (state: RootState) => state.ui.isMobile