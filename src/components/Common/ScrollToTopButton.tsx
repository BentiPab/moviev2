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
`;

type Props = {
    id: string;
};

const ScrollToTopButton: FC<Props> = ({ id }) => {
    const handleClick = () => {
        const element = document.getElementById(id);
        if (!element) {
            return;
        }

        element.scrollTo({ top: 0 });
    };
    return (
        <Tooltip title="Scroll back to top">
            <StyledButton onClick={handleClick}>
                <ArrowCircleUpIcon fontSize="large" />
            </StyledButton>
        </Tooltip>
    );
};

export default ScrollToTopButton;
