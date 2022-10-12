import { createSlice } from "@reduxjs/toolkit";
import { DataState, MediaListsRoutes } from "model/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { getCurrentList } from "./../../utils/path";
import { BaseData } from "./../../model/models";

const initialState: DataState = {
  currentList: getCurrentList() || undefined,
};

export const slice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentList: (
      state,
      { payload }: PayloadAction<MediaListsRoutes | undefined>
    ) => {
      state.currentList = payload;
    },
    setCurrentMedia: (
      state,
      { payload }: PayloadAction<BaseData | undefined>
    ) => {
      state.currentMedia = payload;
    },
  },
});

export default slice.reducer;
