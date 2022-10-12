import { ListItemButton, ListItemIcon, Collapse } from "@mui/material";
import React from "react";
import ExpandButtons from "components/Common/ExpandButtons";
import { NavLinkType } from "model/models";
import { useLocation, useNavigate } from "react-router-dom";
import NavSubLink from "./NavSubLink";
import { useDispatch, useSelector } from "react-redux";
import { selectExpandedNav } from "features/ui/selectors";
import uiActions from "features/ui/actions";
import ListItemText from "./../Common/ListItemText";
import useIsMobile from 'hooks/useIsMobile';

type Props = {
    link: NavLinkType;
};

const NavExpandLink: React.FC<Props> = ({
    link: { value, label, sublinks, icon, expandable = false },
}) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const active = pathname.includes(value);
    const dispatch = useDispatch();
    const isExpanded = useSelector(selectExpandedNav(label));
    const isMobile = useIsMobile()

    const handleExpandableLink = () => {
        if (!isExpanded) {
            dispatch(uiActions.setExpandedNav(label));
            return;
        }
        dispatch(uiActions.setExpandedNav(""));
    };

    const handleClick = () => {
        if (expandable) {
            handleExpandableLink();
            return;
        }
        isMobile && dispatch(uiActions.setShowNavbar(false));
        return navigate(label);
    };

    return (
        <>
            <ListItemButton selected={active} onClick={handleClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} capitalizeall />
                {expandable && <ExpandButtons show={isExpanded} />}
            </ListItemButton>
            {expandable && (
                <Collapse in={isExpanded} timeout="auto" orientation="vertical">
                    {sublinks &&
                        sublinks.map((sublink) => (
                            <NavSubLink sublink={sublink} key={sublink.label} />
                        ))}
                </Collapse>
            )}
        </>
    );
};

export default NavExpandLink;
