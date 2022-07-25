import { RootState } from "model/models";

export const selectRequestToken = (state: RootState) => state.auth.requestToken;

export const selectSessionId = (state: RootState) =>
  state.auth.sessionId;

export const selectIsGuestSession = (state: RootState) =>
  state.auth.guestSession;
