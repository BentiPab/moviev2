import InfiniteScroller from "components/Common/InfiniteScroller";
import { useLazyGetMediaListsQuery } from "features/apiCalls/movieEndpoints";
import useCommonParams from "hooks/useCommonParams";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import { useParams } from "react-router-dom";
import Poster from "components/Poster/Poster";
import { BaseData, MediaListsRoutes } from "model/models";
import useScrollToTop from "hooks/useScrollToTop";
import ScrollToTopButton from "components/Common/ScrollToTopButton";

const ID = 'medias-page'

const MediasPage = () => {
    const showScrollToTopButton = useScrollToTop(ID);
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
    console.log('showButon', showScrollToTopButton)
    return (
        <>
            {!media || isLoading ? (
                <LoadingPage />
            ) : (
                <InfiniteScroller
                    isFetching={isFetching}
                    $maincontent
                    handleScroll={() => !isLastPage && getMedia()}
                    mediaPage
                    scrollToTop={list !== lastList}
                    id={ID}
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
            {showScrollToTopButton && <ScrollToTopButton id={ID} />}
        </>
    );
};

export default MediasPage;
