import { ListItem as MuiListItem, ListItemProps } from "@mui/material";

const ListItem: React.FC<ListItemProps> = ({ children, ...props }) => {
    return <MuiListItem {...props}>{children}</MuiListItem>;
};
