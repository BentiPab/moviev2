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
    $maincontent?: boolean;
    mediaPage?: boolean;
    scrollToTop?: boolean;
    id?: string
    $onecolumn?: boolean
};

const InfiniteScroller: React.FC<Props> = ({
    children,
    handleScroll,
    flex,
    direction,
    $maincontent,
    isFetching,
    mediaPage,
    scrollToTop,
    id,
    $onecolumn
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
                    $maincontent={$maincontent}
                    ref={divRef}
                    $direction={direction}
                    $mediapage={mediaPage}
                    id={id}
                >
                    {children}
                    {isFetching && <LoadingPage expandAll />}
                </FullWidthFlex>
            ) : (
                <FullWidthGrid $maincontent={$maincontent} ref={divRef} id={id} $onecolumn={$onecolumn}>
                    {children}
                    {isFetching && <LoadingPage expandAll />}
                </FullWidthGrid>
            )}
        </>
    );
};

export default InfiniteScroller;
