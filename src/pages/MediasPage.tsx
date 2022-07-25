import InfiniteScroller from "components/Common/InfiniteScroller";
import { useLazyGetMediaListsQuery } from "features/apiCalls/movieEndpoints";
import useCommonParams from "hooks/useCommonParams";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import {
    selectCurrentMediaList,
    selectBaseData,
} from "../features/data/selectors";
import { useParams } from "react-router-dom";
import { selectIsMobile } from "./../features/ui/selectors";
import Poster from "components/Poster/Poster";

const MediasPage = () => {
    const [page, setPage] = useState(1);
    const { type = "" } = useParams<{ type: string }>();
    const [fetchData, { isLoading, isFetching }] = useLazyGetMediaListsQuery();
    const params = useCommonParams();
    const list = useSelector(selectCurrentMediaList);
    const media = useSelector(selectBaseData);
    const isMobile = useSelector(selectIsMobile);

    const getmedia = useCallback(async () => {
        if (!list) {
            return;
        }

        await fetchData({
            type,
            params: { ...params, page },
            list,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, list]);

    useEffect(() => {
        setPage(1);
    }, [list]);

    useEffect(() => {
        getmedia();
    }, [getmedia]);

    return (
        <>
            {!media || isLoading ? (
                <LoadingPage />
            ) : (
                <InfiniteScroller
                    direction="row"
                    flex={isMobile}
                    isFetching={isFetching}
                    mainContent
                    handleScroll={() => setPage(page + 1)}
                    page={page}
                    mediaPage
                >
                    {media.map((posterData) => (
                        <Poster
                            posterData={posterData}
                            key={posterData.id}
                            shouldShowOverlay
                            shouldZoom
                            mainPage
                        />
                    ))}
                </InfiniteScroller>
            )}
        </>
    );
};

export default MediasPage;
