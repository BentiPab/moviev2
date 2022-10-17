import ScrollToTopButton from "components/Common/ScrollToTopButton";
import Poster from "components/Poster/Poster";
import { useGetQuerySearchQuery } from "features/apiCalls/mediaEndpoints";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FullWidthGrid } from "styleguide/commonComponents";
import LoadingPage from "./LoadingPage";
import { SCROLL_DISTANCE } from "./constants";
import NoResults from "components/NoResults/NoResults";
import styled from 'styled-components';

const NoResultsContainer = styled.div`
       padding: 1rem;
`

const SearchPage = () => {
    const [query] = useSearchParams();
    const searchQuery = query.get("query")!
    const queryType = query.get("queryType")!
    const { data, isLoading } = useGetQuerySearchQuery({
        query: searchQuery,
        queryType,
    });
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0 });
        }
    };

    if (isLoading) {
        return <LoadingPage />
    }

    return !data?.results.length ?
        (
            <NoResultsContainer>
                <NoResults resultsType={"Search"} message={`No results found for ${searchQuery}`} />
            </NoResultsContainer>
        ) : (
            <>
                <FullWidthGrid
                    ref={containerRef}
                    $maincontent
                    onScroll={(ev) => {
                        setShowScrollToTopButton(
                            ev.currentTarget.scrollTop > SCROLL_DISTANCE
                        );
                    }}
                >
                    {data.results.map((posterData) => (
                        <Poster
                            posterData={posterData}
                            key={posterData.id}
                            shouldShowOverlay
                            shouldZoom
                            mainPage
                        />
                    ))}
                </FullWidthGrid>
                {showScrollToTopButton && (
                    <ScrollToTopButton handleClick={handleScrollToTop} />
                )}
            </>
        );
};

export default SearchPage;
