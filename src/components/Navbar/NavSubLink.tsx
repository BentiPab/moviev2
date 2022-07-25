import { ListItemButton } from "@mui/material";
import authActions from "features/auth/actions";
import dataActions from "features/data/actions";
import { NavSubtitlesType } from "model/models";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useThunkDispatch from "./../../hooks/useThunkDispatch";
import ListItemText from './../Common/ListItemText';
import { selectIsMobile } from './../../features/ui/selectors';
import uiActions from "features/ui/actions";

type Props = {
    sublink: NavSubtitlesType;
};

const NavSubLink: React.FC<Props> = ({ sublink: { label, path, value } }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const active = pathname.includes(path);
    const dispatch = useThunkDispatch();
    const isMobile = useSelector(selectIsMobile)
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
