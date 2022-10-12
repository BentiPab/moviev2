import { RootState } from "model/models";

export const selectCurrentMediaList = (state: RootState) =>
  state.data.currentList;

export const selectCurrentMedia = (state: RootState) => state.data.currentMedia;
