import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import theme from "styleguide/theme";
import NavLinks from "./NavLinks";
import { selectShowNavbar } from "features/ui/selectors";
import uiActions from "features/ui/actions";
import CloseIcon from "@mui/icons-material/Close";


const StyledCloseIcon = styled(CloseIcon)`
  align-self: flex-end;
  margin: 5px 5px 0;
`;

const NavbarContainer = styled.div<{ show: boolean }>`
  position: absolute;
  width: 50%;
  min-width: 205px;
  left: -400px;
  transform: ${(props) => (props.show ? "translate(400px)" : "translate(0)")};
  transition: transform 0.5s;
  z-index: 100;
  top: 0;
  height: 100%;
  background-color: ${theme.palette.background.default};

  ${theme.breakpoints.up("sm")} {
    grid-area: sidebar;
    flex-flow: column nowrap;
    display: flex;
    position: sticky;
    width: 100%;

    ${StyledCloseIcon} {
      display: none;
    }
  }
`;


const Navbar = () => {
  const showNavbar = useSelector(selectShowNavbar);
  const dispatch = useDispatch();
  return (
    <NavbarContainer show={showNavbar}>
      <StyledCloseIcon
        onClick={() => dispatch(uiActions.setShowNavbar(false))}
      />
      <NavLinks />
    </NavbarContainer>
  );
};

export default Navbar;
