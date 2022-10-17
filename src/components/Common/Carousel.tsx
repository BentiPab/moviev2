import { FC, ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import { PosterContainer } from "components/Poster/Poster";
import { styledScrollbar } from "./../../styleguide/commonComponents";
import theme from "styleguide/theme";
import { pxToRem } from "utils/styles";

type Props = {
    children: ReactNode;
    autoplay?: boolean;
};

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  padding-bottom: 1rem;

  @media (hover: hover) and (pointer: fine) {
    ${styledScrollbar}
    &::-webkit-scrollbar {
    height: ${pxToRem(parseInt(theme.spacing(1)))}rem;
  }
  }
`;

const CarouselItems = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  gap: 1rem;
  ${PosterContainer} {
    width: 200px;
  }

  &:before {
    height: 100%;
    content: "";
    width: 0;
    position: sticky;
    left: 0;
    box-shadow: 5px 0 23px 27px #000000;
    z-index: 50;
  }

  &:after {
    height: 100%;
    content: "";
    width: 0;
    position: sticky;
    right: 0;
    box-shadow: 5px 0 23px 27px #000000;
    z-index: 50;
  }
`;

const Carousel: FC<Props> = ({ autoplay = false, children }) => {
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const scroll = setInterval(() => {
            if (divRef.current && autoplay) {
                const el = divRef.current;
                if (el.scrollWidth - el.scrollLeft <= el.clientWidth) {
                    el.scrollTo({ left: 0, behavior: "smooth" });
                    return;
                }

                el.scrollBy({ left: el.scrollLeft + 600, behavior: "smooth" })
            }
        }, 5000);

        return () => clearInterval(scroll);
    }, [autoplay]);
    return (
        <CarouselContainer ref={divRef}>
            <CarouselItems>{children}</CarouselItems>
        </CarouselContainer>
    );
};

export default Carousel;
