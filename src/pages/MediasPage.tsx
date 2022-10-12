import InfiniteScroller from "components/Common/InfiniteScroller";
import { useLazyGetMediaListsQuery } from "features/apiCalls/movieEndpoints";
import useCommonParams from "hooks/useCommonParams";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import { useParams } from "react-router-dom";
import { selectIsMobile } from "./../features/ui/selectors";
import Poster from "components/Poster/Poster";
import { BaseData, MediaListsRoutes } from "model/models";

const MediasPage = () => {
    const { type = "", list = "" } = useParams<{
        type: string;
        list: MediaListsRoutes;
    }>();
    const [
        fetchData,
        { isLoading, isFetching },
        {
            lastArg: { list: lastList, params: lastParams },
        },
    ] = useLazyGetMediaListsQuery();
    const params = useCommonParams();
    const [media, setMedia] = useState<BaseData[]>([]);
    const isMobile = useSelector(selectIsMobile);
    const [isLastPage, setIsLastPage] = useState(false);

    const getMedia = async () => {
        if (!list || !list) {
            return;
        }

        const isCurrentList = list === lastList;
        const page = isCurrentList ? parseInt(lastParams.page as string) + 1 : 1;

        const { data } = await fetchData({
            type,
            params: { ...params, page },
            list,
        });

        setMedia((currentMedia) => {
            if (isCurrentList) {
                return [...currentMedia, ...(data?.results ?? [])];
            }

            return [...(data?.results ?? [])];
        });
        setIsLastPage(data?.total_pages === data?.page);
    };

    useEffect(() => {
        getMedia();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, type]);

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
                    handleScroll={() => !isLastPage && getMedia()}
                    mediaPage
                    scrollToTop={list !== lastList}
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
