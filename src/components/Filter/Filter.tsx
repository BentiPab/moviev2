import FilterAltIcon from '@mui/icons-material/FilterAlt';
import styled from 'styled-components';

const StyledFilterIcon = styled(FilterAltIcon)`
    cursor: pointer;
    opacity: 0.5;
`

const Filter = () => {
    return (
        <StyledFilterIcon />
    )
}

export default Filter