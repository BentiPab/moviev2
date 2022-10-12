import AddIcon from "@mui/icons-material/Add";
import Button from '@mui/material/Button';
import { FC } from "react";
import styled from "styled-components";

type Props = {
    handleClick: () => void;
    label: string;
};

const StyledButton = styled(Button)`
    flex-basis: 100%;
    grid-column: 1 / -1 ;
`

const AddButton: FC<Props> = ({ handleClick, label }) => {
    return (
        <StyledButton variant="contained" onClick={handleClick} endIcon={<AddIcon />}>
            {label}
        </StyledButton>
    );
};

export default AddButton;
