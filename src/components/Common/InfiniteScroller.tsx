import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FullWidthFlex, FullWidthGrid } from "styleguide/commonComponents";
import LoadingPage from "./../../pages/LoadingPage";
import { SCROLL_DISTANCE } from "./../../pages/constants";
import ScrollToTopButton from "./ScrollToTopButton";

type Props = {
    children: ReactNode;
    handleScroll: () => void;
    isFetching: boolean;
    flex?: boolean;
    direction?: "column" | "row";
    maxPages?: number;
    $maincontent?: boolean;
    mediaPage?: boolean;
    showScrollToTopButton?: boolean;
    scrollToTop?: boolean;
    $onecolumn?: boolean;
};

const InfiniteScroller: React.FC<Props> = ({
    children,
    handleScroll,
    flex,
    direction,
    $maincontent,
    isFetching,
    mediaPage,
    $onecolumn,
    showScrollToTopButton = false,
    scrollToTop,
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [shouldShowScrollToTopButton, setShouldShowScrollToTopButton] =
        useState(false);

    const handleScrollToTop = () => {
        if (divRef.current) {
            divRef.current.scrollTo({ top: 0 });
        }
    };

    useEffect(() => {
        if (scrollToTop && divRef.current) {
            divRef.current.scrollTo({ top: 0 });
        }
    }, [scrollToTop]);

    const handleScrollEvent = (ev: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollTop, scrollHeight, clientHeight } = ev.currentTarget;
        const isAtButton = scrollHeight - scrollTop <= clientHeight;
        if (isAtButton) {
            handleScroll();
        }

        setShouldShowScrollToTopButton(
            scrollTop > SCROLL_DISTANCE && showScrollToTopButton
        );
    };

    return (
        <>
            {flex ? (
                <FullWidthFlex
                    $maincontent={$maincontent}
                    ref={divRef}
                    $direction={direction}
                    $mediapage={mediaPage}
                    onScroll={handleScrollEvent}
                >
                    {children}
                    {isFetching && <LoadingPage expandAll />}
                    {shouldShowScrollToTopButton && (
                        <ScrollToTopButton handleClick={handleScrollToTop} />
                    )}
                </FullWidthFlex>
            ) : (
                <FullWidthGrid
                    $maincontent={$maincontent}
                    ref={divRef}
                    $onecolumn={$onecolumn}
                    onScroll={handleScrollEvent}
                >
                    {children}
                    {isFetching && <LoadingPage expandAll />}
                    {shouldShowScrollToTopButton && (
                        <ScrollToTopButton handleClick={handleScrollToTop} />
                    )}
                </FullWidthGrid>
            )}
        </>
    );
};

export default InfiniteScroller;
