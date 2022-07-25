import { FormInputProps } from "model/models";
import styled from 'styled-components';
import theme from "styleguide/theme";
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from "@mui/material";

const StyledInput = styled(InputBase)`
    background-color: ${theme.palette.background.default};
    border: none;
    width: 100%;
    border-radius:10px ;
    padding: 0 10px;
    
    &:focus {
        outline: none;
    }

    .MuiInputBase-input {
        color: ${theme.palette.common.white};
        padding: 0 10px;
        
        &::placeholder {
            text-transform: capitalize;
            color: ${theme.palette.common.white};
            
        }
    }

    svg {
        opacity: 0.5;
        color: ${theme.palette.common.white};
    }

    ${theme.breakpoints.up('md')} {
        width: 50%;
        height: 50%;
    }
        
    `

interface Props extends FormInputProps {
    placeholder?: string;
}

const SearchInput: React.FC<Props> = ({ field, ...props }) => {

    return (
        <StyledInput startAdornment={<SearchIcon />} {...props} />
    )

}

export default SearchInput