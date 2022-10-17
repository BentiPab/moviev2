import { FC } from "react";
import { Tooltip } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import styled from "styled-components";

const StyledButton = styled.div`
  cursor: pointer;
  position: fixed !important;
  bottom: 2rem;

  right: 2rem;
  z-index: 100;
  border-radius: 50%;
  background-color: #1976d2;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1565c0;
  }
`;

type Props = {
    handleClick: () => void;
};

const ScrollToTopButton: FC<Props> = ({ handleClick }) => {

    return (
        <Tooltip title="Scroll back to top">
            <StyledButton onClick={handleClick}>
                <ArrowCircleUpIcon fontSize="large" />
            </StyledButton>
        </Tooltip>
    );
};

export default ScrollToTopButton;
