import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { selectIsMobile, selectShowNavbar } from "features/ui/selectors";
import uiActions from "features/ui/actions";


const Hamburger = () => {
    const showNavbar = useSelector(selectShowNavbar);
    const isMobile = useSelector(selectIsMobile);
    const dispatch = useDispatch();
    console.log(showNavbar)
    return isMobile ? (
        <MenuIcon onClick={() => dispatch(uiActions.setShowNavbar(true))} />
    ) : null;
};

export default Hamburger;
