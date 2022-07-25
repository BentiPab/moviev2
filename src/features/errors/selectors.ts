import { RootState } from "model/models";

export const selectHttpErrors = (state: RootState) => state.errors.http;

export const selectUiErrors = (state: RootState) => state.errors.ui;

export const selectLoginError = (state: RootState) => state.errors.login;

export const selectMissingAuthError = (state: RootState) =>
  state.errors.missingAuth;
