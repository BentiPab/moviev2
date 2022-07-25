import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware,
} from "@reduxjs/toolkit";
import notificationsActions from "features/notifications/actions";

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
            console.warn("We got a rejected action!");
            api.dispatch(notificationsActions.addNotification({
                type: 'error',
                message: 'Internal error - Something went wrong!',
                autoClose: true,
            }))
        }

        return next(action);
    };
