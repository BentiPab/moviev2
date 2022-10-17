import { useEffect } from "react";
import { FullWidthFlex } from "styleguide/commonComponents";
import { Cookie } from "utils/cookies";
import PopularCarousel from "./PopularCarousel";
import styled from 'styled-components';
import { styledScrollbar } from './../../styleguide/commonComponents';

const HomePageContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: 4rem;
    padding: 3rem 0;
    overflow-x: hidden;
    overflow-y: auto;
    ${styledScrollbar}

`

const Homepage = () => {
    return (
        <HomePageContainer>
            <PopularCarousel type="movie" />
            <PopularCarousel type="tv" />
        </HomePageContainer>
    );
};

export default Homepage;
