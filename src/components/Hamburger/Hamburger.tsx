import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import uiActions from "features/ui/actions";
import styled from 'styled-components';

export const HamburgerIcon = styled(MenuIcon)``

const Hamburger = () => {
    const dispatch = useDispatch();

    return (
        <HamburgerIcon onClick={() => dispatch(uiActions.setShowNavbar(true))} />
    )
};

export default Hamburger;
