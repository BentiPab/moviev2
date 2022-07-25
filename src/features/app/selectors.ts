import { RootState } from "model/models";

export const selectLanguage = (state: RootState) => state.app.language;

export const selectCountryCode = (state: RootState) => state.app.countryCode;

export const selectCountryName = (state: RootState) => state.app.country;
