import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateUID } from "utils/uid";
import { Notification, Id, AddNotificationPayload } from "./../../model/models";

const initialState: Notification[] = [];

export const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, { payload }: PayloadAction<AddNotificationPayload>) => {
      const id = payload.id || generateUID();
      state.push({ ...payload, id })
    },
    removeNotification: (state, { payload }: PayloadAction<Id>) =>
      state.filter(({ id }) => payload !== id),
  },
});

export default slice.reducer;
