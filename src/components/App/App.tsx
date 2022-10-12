import Navbar from "components/Navbar/Navbar";
import Searchbar from "components/Search/Searchbar";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import RoutesHandler from "./../../routes/RoutesHandler";
import useInitializeUserData from "./../../hooks/useInitializeUserData";
import NotificationArea from "components/NotificationArea/NotificationArea";
import { useGetUserInformation } from "hooks/useGetUserInformation";
import theme from "styleguide/theme";

const FullHeightContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  max-width: 100%;
  max-height: 100%;
  
  ${theme.breakpoints.up("sm")} {
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: minmax(50px, 75px) 1fr;
    grid-template-areas:
      "sidebar search"
      "sidebar main-content";
  }
`;

const App = () => {
    useInitializeUserData();
    useGetUserInformation();
    return (
        <BrowserRouter>
            <FullHeightContainer>
                <Searchbar />
                <Navbar />
                <RoutesHandler />
                <NotificationArea />
            </FullHeightContainer>
        </BrowserRouter>
    );
};

export default App;
