import { RootState } from "model/models";

export const selectExpandedNav = (nav: string) => (state: RootState) =>
  state.ui.expandedNav === nav;

export const selectShowNavbar = (state: RootState) => state.ui.showNavbar;
