import { selectSessionId } from "features/auth/selectors";
import { selectUser } from "features/user/selectors";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useThunkDispatch from "./useThunkDispatch";
import usersActions from "features/user/actions";

export const useGetUserInformation = () => {
    const user = useSelector(selectUser);
    const sessionId = useSelector(selectSessionId);
    const dispatch = useThunkDispatch();

    useEffect(() => {
        if (!user && !!sessionId) {
            dispatch(usersActions.fetchUser());
        }
    }, [dispatch, sessionId, user]);
};
