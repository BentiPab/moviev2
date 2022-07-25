import { createSlice } from "@reduxjs/toolkit";
import { movieEndpoints } from "features/apiCalls/movieEndpoints";
import { DataState, MediaListsRoutes } from "model/models";
import { PayloadAction } from "@reduxjs/toolkit";
import { getCurrentList } from "./../../utils/path";
import { BaseData } from "./../../model/models";

const initialState: DataState = {
    listData: [],
    currentList: getCurrentList() || undefined,
};

const { getMediaLists } = movieEndpoints.endpoints;

export const slice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setCurrentList: (
            state,
            { payload }: PayloadAction<MediaListsRoutes | undefined>
        ) => {
            state.currentList = payload;
            state.listData = [];
        },
        setCurrentMedia: (
            state,
            { payload }: PayloadAction<BaseData | undefined>
        ) => {
            state.currentMedia = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(getMediaLists.matchFulfilled, (state, { payload }) => {
            state.listData?.push(...payload.results);
        });
    },
});

export default slice.reducer;
