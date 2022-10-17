import InfiniteScroller from "components/Common/InfiniteScroller";
import { useLazyGetMediaReviewsQuery } from "features/apiCalls/mediaEndpoints";
import LoadingPage from "pages/LoadingPage";
import React, { useState, useEffect } from "react";
import { Review as ReviewType } from "../../../model/models";
import Review from "./Review";
import NoResults from "./../../../components/NoResults/NoResults";
import { WhiteDivider } from "../MediaPage";

type Props = {
    mediaId: string;
    type: string;
};


const MediaReviews: React.FC<Props> = ({ mediaId, type }) => {
    const [
        fetchReviews,
        { isLoading, isFetching },
        {
            lastArg: { page: lastPage },
        },
    ] = useLazyGetMediaReviewsQuery();
    const [reviews, setReviews] = useState<ReviewType[]>();
    const [isLastPage, setIsLastPage] = useState(false);

    const getReviews = async () => {
        const page = !!lastPage ? lastPage + 1 : 1;
        const { data } = await fetchReviews({ type, mediaId, page });
        const oldValues = reviews ?? [];
        const newReviews = oldValues.concat(data?.results ?? []);
        setIsLastPage(page === data?.total_pages);
        setReviews(newReviews);
    };

    useEffect(() => {
        getReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    const sortedReviews = reviews?.sort((a, b) =>
        a.created_at < b.created_at ? 1 : -1
    );

    return (
        <>
            {sortedReviews && sortedReviews.length ? (
                <InfiniteScroller
                    handleScroll={() => !isLastPage && getReviews()}
                    isFetching={isFetching}
                    $onecolumn
                    showScrollToTopButton
                >
                    {sortedReviews.map((review, index) => {
                        const isLastItem = index === sortedReviews.length - 1;

                        return (
                            <>
                                <Review review={review} />
                                {!isLastItem && <WhiteDivider />}
                            </>
                        );
                    })}
                </InfiniteScroller>
            ) : (
                <NoResults resultsType="Reviews" />
            )}
        </>
    );
};

export default MediaReviews;
