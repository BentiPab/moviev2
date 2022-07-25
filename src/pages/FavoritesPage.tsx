import PosterGridContainer from "components/Poster/PosterGridContainer";
import { useSelector } from "react-redux";
import {
    selectFavoriteMovies,
    selectFavoriteTvShows,
} from "./../features/user/selectors";
import {
    FullWidthColumnContainer,
    FullWidthGrid,
    FullWidthRowContainer,
} from "styleguide/commonComponents";
import Subtitle from "../components/Common/Subtitle";

const FavoritesPage = () => {
    const favoriteTvShows = useSelector(selectFavoriteTvShows);
    const favoriteMovies = useSelector(selectFavoriteMovies);
    return (
        <FullWidthColumnContainer mainContent>
            {favoriteMovies && (
                <FullWidthRowContainer>
                    <Subtitle subtitle="Movies" />
                    <FullWidthGrid>
                        <PosterGridContainer postersData={favoriteMovies} />
                    </FullWidthGrid>
                </FullWidthRowContainer>
            )}
            {favoriteTvShows && (
                <FullWidthRowContainer>
                    <Subtitle subtitle="Tv Shows" />
                    <FullWidthGrid>
                        <PosterGridContainer postersData={favoriteTvShows} />
                    </FullWidthGrid>
                </FullWidthRowContainer>
            )}
        </FullWidthColumnContainer>
    );
};

export default FavoritesPage;
