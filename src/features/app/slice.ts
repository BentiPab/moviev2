import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "model/models";
import { appApi } from "features/apiCalls/apiCalls";
import { getRegion } from "utils/intersession";

const initialState: AppState = {
    language: getRegion().language,
    country: getRegion().country,
    countryCode: getRegion().countryCode,
};

const { getUserCountry } = appApi.endpoints;

export const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLanguage: (state, { payload }: PayloadAction<string>) => {
            state.language = payload;
        },
        setCountry: (
            state,
            { payload }: PayloadAction<{ country: string; countryCode: string }>
        ) => {
            state.country = payload.country;
            state.countryCode = payload.countryCode;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            getUserCountry.matchFulfilled,
            (state, { payload }: PayloadAction<{ country_name: string, country_code: string }>) => {
                state.country = payload.country_name;
                state.countryCode = payload.country_code;
            }
        );
    },
});

export default slice.reducer;
