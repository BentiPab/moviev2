import { ListItemText as MuiListItemText, ListItemTextProps } from '@mui/material';
import styled from 'styled-components';

interface ExtendedListItemTextProps extends ListItemTextProps {
    capitalizeall?: boolean
}

const StyledListItemText = styled(MuiListItemText) <ExtendedListItemTextProps>`
    ${props => props.capitalizeall && `
        .MuiListItemText-primary {
            text-transform: capitalize;
        }
    `}
`

const ListItemText: React.FC<ExtendedListItemTextProps> = ({ ...props }) => {
    return <StyledListItemText {...props} />
}

export default ListItemText