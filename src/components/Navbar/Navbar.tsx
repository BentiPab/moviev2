import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import theme from "styleguide/theme";
import NavLinks from "./NavLinks";
import { selectShowNavbar } from "features/ui/selectors";
import uiActions from "features/ui/actions";
import CloseIcon from "@mui/icons-material/Close";
import { selectIsMobile } from './../../features/ui/selectors';

const NavbarContainer = styled.div<{ show: boolean }>`
  position: sticky;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${theme.palette.background.default};
  grid-area: sidebar;

  @media screen and (max-width: 768px) {
    position: absolute;
    width: 50%;
    min-width: 205px;
    left: -400px;
    transform:  ${props => props.show ? 'translate(400px)' : 'translate(0)'};
    transition: transform .5s;
    z-index: 100;
  }
`;

const StyledCloseIcon = styled(CloseIcon)`
  align-self: flex-end;
  margin: 5px 5px 0;
`

const Navbar = () => {
  const showNavbar = useSelector(selectShowNavbar);
  const dispatch = useDispatch()
  const isMobile = useSelector(selectIsMobile)
  return (
    <NavbarContainer show={showNavbar}>
      {isMobile && <StyledCloseIcon onClick={() => dispatch(uiActions.setShowNavbar(false))} />}
      <NavLinks />
    </NavbarContainer>
  );
};

export default Navbar;
