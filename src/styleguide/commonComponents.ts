import styled from "styled-components";
import { pxToRem } from "utils/styles";
import theme from "./theme";

export const FullWidthRowContainer = styled.div<{ mainContent?: boolean }>`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: flex-start;
  ${(props) => props.mainContent && "grid-area: main-content;"}
`;

export const FullWidthColumnContainer = styled(FullWidthRowContainer)`
  flex-flow: column nowrap;
  gap: 2rem;
`;

export const FullWidthGrid = styled.div<{ mainContent?: boolean }>`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-auto-rows: min-content;
  grid-gap: 2px 4px;
  padding: 0 10px;
  justify-content: center;
  ${(props) => props.mainContent && "grid-area: main-content;"}
  overflow-y: scroll;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    width: ${pxToRem(parseInt(theme.spacing(1)))}rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.palette.grey[800]};
    border-radius: 10px;
  }
`;

export const FullWidthFlex = styled(FullWidthGrid) <{
  direction?: "column" | "row";
  mediaPage?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "column")};
  justify-content: flex-start;
  grid-gap: 0;
  ${({ mediaPage }) =>
    mediaPage &&
    `
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  `}
`;
