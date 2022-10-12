import React, { ReactNode, useEffect, useRef } from "react";
import { FullWidthFlex, FullWidthGrid } from "styleguide/commonComponents";
import { useDispatch } from "react-redux";
import LoadingPage from "./../../pages/LoadingPage";

type Props = {
    children: ReactNode;
    handleScroll: () => void;
    isFetching: boolean;
    flex?: boolean;
    direction?: "column" | "row";
    maxPages?: number;
    mainContent?: boolean;
    mediaPage?: boolean;
    scrollToTop?: boolean;
};

const InfiniteScroller: React.FC<Props> = ({
    children,
    handleScroll,
    flex,
    direction,
    mainContent,
    isFetching,
    mediaPage,
    scrollToTop,
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const currRef = divRef.current;
        if (!currRef) {
            return;
        }

        if (scrollToTop) {
            currRef.scrollTo({ top: 0 });
        }

        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = currRef;
            const isAtButton = scrollHeight - scrollTop <= clientHeight;
            if (isAtButton) {
                handleScroll();
            }
        };
        currRef.addEventListener("scroll", onScroll);

        return () => {
            currRef.removeEventListener("scroll", onScroll);
        };
    }, [dispatch, handleScroll, scrollToTop]);

    return (
        <>
            {flex ? (
                <FullWidthFlex
                    mainContent={mainContent}
                    ref={divRef}
                    direction={direction}
                    mediaPage={mediaPage}
                >
                    {children}
                    {isFetching && <LoadingPage expandAll />}
                </FullWidthFlex>
            ) : (
                <FullWidthGrid mainContent={mainContent} ref={divRef}>
                    {children}
                    {isFetching && <LoadingPage expandAll />}
                </FullWidthGrid>
            )}
        </>
    );
};

export default InfiniteScroller;
