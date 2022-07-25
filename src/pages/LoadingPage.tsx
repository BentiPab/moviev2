import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import { FullWidthRowContainer } from "./../styleguide/commonComponents";

const FullWidthContainer = styled(FullWidthRowContainer) <{
    expandAll?: boolean;
}>`
  flex-flow: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  min-height: 150px;

  ${({ expandAll }) => expandAll && "grid-column: 1/-1;"}
`;

const LoadingPage: React.FC<{ expandAll?: boolean }> = ({ expandAll }) => {
    return (
        <FullWidthContainer expandAll={expandAll}>
            <CircularProgress id="loader" />
        </FullWidthContainer>
    );
};

export default LoadingPage;
