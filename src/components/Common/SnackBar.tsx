import {
    Snackbar as MsSnackbar,
    SnackbarOrigin,
    SnackbarProps,
} from "@mui/material";
import styled from "styled-components";

interface CustomSnackbarProps extends SnackbarProps {
    colored?: boolean;
}

const defaultAnchor: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "right",
};

const StyledSnackbar = styled(MsSnackbar) <CustomSnackbarProps>`
  ${(props) =>
        props.color &&
        `
		.MuiPaper-root {
			background-color: ${props.color};
		}
	`}
    
`;

const Snackbar: React.FC<CustomSnackbarProps> = ({
    children,
    anchorOrigin = defaultAnchor,
    color,
    ...props
}) => {
    return (
        <StyledSnackbar {...props} color={color} anchorOrigin={anchorOrigin}>
            {children}
        </StyledSnackbar>
    );
};

export default Snackbar;
