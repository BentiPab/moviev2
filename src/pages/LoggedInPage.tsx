import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetSessionIdMutation } from "features/apiCalls/authEndpoints";
import LoadingPage from "./LoadingPage";
import { getIntersessionSessionId, removeIntersessionRequestToken } from "utils/intersession";

const LoggedInPage = () => {
    const [params] = useSearchParams();
    const reqToken = params.get("request_token");
    const approved = params.get("approved");
    const [fetchSessionId] = useGetSessionIdMutation();
    const [loading, setLoading] = useState(false);
    const sessionId = getIntersessionSessionId()

    const getUser = async () => {
        setLoading(true)
        if (approved && !!reqToken && !sessionId) {
            await fetchSessionId(reqToken);
            removeIntersessionRequestToken()
            setLoading(false)
        }
    };

    useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? <LoadingPage /> : <Navigate to={"/"} />;
};

export default LoggedInPage;
