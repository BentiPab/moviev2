import appConfig from "config";
import { moviesApi } from "features/apiCalls/apiCalls";
import { RequestToken, SessionId } from "model/models";
import { getBuiltPath } from "./../../utils/path";

const authRoutes = {
    guest: `authentication/guest_session/new?api_key=${appConfig.api.key}`,
    token: `authentication/token/new`,
    newSession: `authentication/session/new`,
    deleteSession: `authentication/session`
};

export const authEndpoints = moviesApi.injectEndpoints({
    endpoints: (build) => ({
        getRequestToken: build.query<RequestToken, void>({
            query: () => getBuiltPath(authRoutes.token),
        }),
        getSessionId: build.mutation<SessionId, string>({
            query: (reqToken) => ({
                url: getBuiltPath(authRoutes.newSession),
                method: "POST",
                body: {
                    request_token: reqToken,
                },
            }),
        }),
        getGuestSession: build.query<SessionId, undefined>({
            query: () => getBuiltPath(authRoutes.guest),
        }),
        deleteSession: build.mutation<void, string>({
            query: (session_id) => ({
                url: getBuiltPath(authRoutes.deleteSession),
                method: 'DELETE',
                body: {
                    session_id
                }
            })
        })
    }),
});

export const {
    useLazyGetRequestTokenQuery,
    useGetSessionIdMutation,
    useGetGuestSessionQuery,
} = authEndpoints;
