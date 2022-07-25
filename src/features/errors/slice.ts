import { Errors, HttpError, MissingAuthError } from "model/models";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { generateUID } from "utils/uid";
import { LoginError } from "./../../model/models";

const emptyLoginError = {
  message: "",
  details: "",
};

const initialState: Errors = {
  http: [],
  ui: [],
  login: emptyLoginError,
  missingAuth: [],
};

export const slice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setHttpError: (state, { payload }: PayloadAction<HttpError>) => {
      state.http.push({
        id: generateUID(),
        ...payload,
      });
    },
    removeHttpError: (state, { payload }: PayloadAction<string>) => {
      state.http = state.http.filter(({ id }) => payload !== id);
    },
    resetHttpError: (state) => {
      state.http = [];
    },
    setUiError: (state, { payload }: PayloadAction<Error>) => {
      state.ui.push({
        id: generateUID(),
        message: payload.message || "Unexpected Error",
        stack: payload.stack || "",
      });
    },
    removeUiError: (state, { payload }: PayloadAction<string>) => {
      state.ui = state.ui.filter(({ id }) => payload !== id);
    },
    resetUiError: (state) => {
      state.ui = [];
    },
    setLoginError: (state, { payload }: PayloadAction<LoginError>) => {
      state.login = payload;
    },
    resetLoginError: (state) => {
      state.login = emptyLoginError;
    },
    setMissingAuthError: (
      state,
      { payload }: PayloadAction<Omit<MissingAuthError, "id">>
    ) => {
      state.missingAuth.push({ ...payload, id: generateUID() });
    },
    removeMissingAuthError: (state, { payload }: PayloadAction<string>) => {
      state.missingAuth = state.missingAuth.filter(({ id }) => id !== payload);
    },
  },
});

export default slice.reducer;
