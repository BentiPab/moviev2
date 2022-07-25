import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "model/models";
import { setIntersessionSessionId, getIntersessionSessionId } from "utils/intersession";
import { authEndpoints } from "./../apiCalls/authEndpoints";
import { setIntersessionRequestToken } from './../../utils/intersession';

const initialState: AuthState = {
  guestSession: true,
  sessionId: getIntersessionSessionId()
};

const { getGuestSession, getRequestToken, getSessionId } = authEndpoints.endpoints

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeRequestToken: (state) => {
      state.requestToken = undefined;
    },
    setSessionId: (state, { payload }) => {
      state.sessionId = payload
    },
    setGuestSession: (state, { payload }) => {
      state.guestSession = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        getRequestToken.matchFulfilled,
        (state, { payload }) => {
          state.requestToken = payload;
          setIntersessionRequestToken(payload)
        }
      ).addMatcher(getSessionId.matchFulfilled, (state, { payload }) => {
        state.sessionId = payload.session_id
        setIntersessionSessionId(payload);
      })
      .addMatcher(
        getGuestSession.matchFulfilled,
        (state, { payload }) => {
          state.sessionId = payload.session_id;
          setIntersessionSessionId(payload);
        }
      );
  },
});

export default slice.reducer;
