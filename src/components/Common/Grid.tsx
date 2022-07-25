import { Grid as MuiGrid, GridProps } from "@mui/material";

const Grid: React.FC<GridProps> = ({ children, ...props }) => {
    return <MuiGrid  {...props}>{children}</MuiGrid>;
};

export default Grid;
