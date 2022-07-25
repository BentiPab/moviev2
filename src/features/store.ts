import { configureStore } from "@reduxjs/toolkit";
import users from "./user/slice";
import errors from "./errors/slice";
import notifications from "./notifications/slice";
import auth from "./auth/slice";
import data from "./data/slice";
import app from "./app/slice";
import ui from "./ui/slice";
import { appApi, moviesApi } from "features/apiCalls/apiCalls";
import { rtkQueryErrorLogger } from "./apiCalls/errorHandling";

const reducer = {
  app,
  auth,
  users,
  errors,
  notifications,
  ui,
  data,
  [moviesApi.reducerPath]: moviesApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware).concat(rtkQueryErrorLogger),
});

export default store;
