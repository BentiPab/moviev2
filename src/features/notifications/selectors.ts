import { RootState } from "model/models";

export const selectNotifications = (state: RootState) => state.notifications;

export const selectNotification = (id: string) => (state: RootState) =>
  state.notifications.find((notification) => notification.id === id);
