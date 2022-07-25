import React, { ReactNode, useEffect, useRef } from "react";
import { FullWidthFlex, FullWidthGrid } from "styleguide/commonComponents";
import { useDispatch, useSelector } from "react-redux";
import { selectPagination } from "./../../features/ui/selectors";
import LoadingPage from "./../../pages/LoadingPage";

type Props = {
    children: ReactNode;
    handleScroll: () => void;
    page: number;
    isFetching: boolean;
    flex?: boolean;
    direction?: "column" | "row";
    maxPages?: number;
    mainContent?: boolean;
    mediaPage?: boolean;
};

const InfiniteScroller: React.FC<Props> = ({
    children,
    handleScroll,
    page,
    flex,
    direction,
    mainContent,
    isFetching,
    mediaPage
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const { totalPages } = useSelector(selectPagination);
    const dispatch = useDispatch();
    useEffect(() => {
        const currRef = divRef.current;
        if (!currRef) {
            return;
        }
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = currRef;
            const isAtButton = scrollHeight - scrollTop <= clientHeight;
            const isMaxPag = page === totalPages;
            if (isAtButton && !isMaxPag) {
                handleScroll();
            }
        };
        currRef.addEventListener("scroll", onScroll);

        return () => {
            currRef.removeEventListener("scroll", onScroll);
        };
    }, [dispatch, page, totalPages, handleScroll]);

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
