import { AppThunk } from "model/models";
import { slice } from "./slice";

const addInfoNotification =
  (message: string, autoClose: boolean = false): AppThunk =>
    (dispatch) => {
      dispatch(
        notificationsActions.addNotification({
          type: "info",
          autoClose,
          message,
        })
      );
    };

const addErrorNotification =
  (message: string, autoClose: boolean = false): AppThunk =>
    (dispatch) => {
      dispatch(
        notificationsActions.addNotification({
          type: "error",
          autoClose,
          message,
        })
      );
    };

const addSuccessNotification =
  (message: string, autoClose: boolean = false): AppThunk =>
    (dispatch) => {

      dispatch(
        notificationsActions.addNotification({
          type: 'success',
          autoClose,
          message,
        })
      );
    };

const notificationsActions = {
  ...slice.actions,
  addInfoNotification,
  addErrorNotification,
  addSuccessNotification
};

export default notificationsActions;
