import { ListItemButton } from "@mui/material";
import authActions from "features/auth/actions";
import dataActions from "features/data/actions";
import { NavSubtitlesType } from "model/models";
import { useLocation, useNavigate } from "react-router-dom";
import useThunkDispatch from "./../../hooks/useThunkDispatch";
import ListItemText from './../Common/ListItemText';
import uiActions from "features/ui/actions";
import useIsMobile from "hooks/useIsMobile";

type Props = {
    sublink: NavSubtitlesType;
};

const NavSubLink: React.FC<Props> = ({ sublink: { label, path, value } }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const active = pathname.includes(path);
    const dispatch = useThunkDispatch();
    const isMobile = useIsMobile()
    const isLogout = label === "logout";

    return (
        <ListItemButton
            selected={active}
            onClick={() => {
                if (isLogout) {
                    dispatch(authActions.logoutUser());
                    navigate("/");
                    return;
                }
                navigate(path, { state: { list: value } });
                if (!active) {
                    dispatch(dataActions.setCurrentList(value));
                }
                isMobile && dispatch(uiActions.setShowNavbar(false))

            }}
        >
            <ListItemText primary={label} capitalizeall />
        </ListItemButton>
    );
};

export default NavSubLink;
