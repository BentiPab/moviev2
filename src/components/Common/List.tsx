import { List as MuiList, ListProps } from "@mui/material";


const List: React.FC<ListProps> = ({ children, ...props }) => {
    return <MuiList {...props}>{children}</MuiList>;
};

export default List;
