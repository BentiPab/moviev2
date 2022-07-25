import { slice } from "./slice";
import { AppThunk } from "model/models";
import { authEndpoints } from "features/apiCalls/authEndpoints";
import { removeIntersessionSessionId } from "utils/intersession";
import usersActions from "features/user/actions";
import notificationsActions from "features/notifications/actions";

const { deleteSession } = authEndpoints.endpoints;

export const logoutUser = (): AppThunk => async (dispatch, getState) => {
  const sessionId = getState().auth.sessionId;
  if (!!sessionId) {
    try {
      await dispatch(deleteSession.initiate(sessionId));
      removeIntersessionSessionId();
      dispatch(authActions.setSessionId(undefined))
      dispatch(usersActions.removeUser());
      dispatch(notificationsActions.addInfoNotification("Logged out"));
    } catch (err) {
      console.error(err)
    }
  }
};

const authActions = {
  ...slice.actions,
  logoutUser,
};

export default authActions;
