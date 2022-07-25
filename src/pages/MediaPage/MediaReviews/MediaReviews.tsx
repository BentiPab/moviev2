import InfiniteScroller from "components/Common/InfiniteScroller";
import { useLazyGetMediaReviewsQuery } from "features/apiCalls/movieEndpoints";
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
    const [fetchReviews, { isFetching }] =
        useLazyGetMediaReviewsQuery();
    const [reviews, setReviews] = useState<ReviewType[]>();
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsLoading(true)
        fetchReviews({ type, mediaId, page }).then((res) => {
            if (!res.data) {
                setIsLoading(false)
                return;
            }
            const oldValues = reviews || []
            const newReviews = oldValues.concat(res.data.results);
            setReviews(newReviews);
            setIsLoading(false)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

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
                    flex
                    direction="column"
                    handleScroll={() => setPage(page + 1)}
                    page={page}
                    isFetching={isFetching}
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
