import { RootState } from "model/models";

export const selectCurrentMediaList = (state: RootState) =>
    state.data.currentList;

export const selectBaseData = (state: RootState) => state.data.listData;

export const selectCurrentMedia = (state: RootState) => state.data.currentMedia;
