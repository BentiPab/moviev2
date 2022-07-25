import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { selectIsGuestSession } from "features/auth/selectors";
import usersActions from "features/user/actions";
import { selectIsFavoriteMedia } from "features/user/selectors";
import { MediaType } from "model/models";
import { useState } from "react";
import { useSelector } from "react-redux";
import useThunkDispatch from "./../../hooks/useThunkDispatch";
import FavoriteIcon from "@mui/icons-material/Favorite";

type Props = {
    mediaId: number;
    mediaType: MediaType;
};

const Favorite: React.FC<Props> = ({ mediaId, mediaType }) => {
    const isGuestSession = useSelector(selectIsGuestSession);
    const dispatch = useThunkDispatch();
    const [isFavorite, setIsFavorite] = useState(useSelector(selectIsFavoriteMedia(mediaId)));
    const handleFav = () => {
        try {
            setIsFavorite(!isFavorite)
            if (isFavorite) {
                dispatch(usersActions.removeFromFavorites(mediaId, mediaType));
                return;
            }
            dispatch(usersActions.addToFavorites(mediaId, mediaType));
        } catch (err) {
            setIsFavorite(isFavorite)
        }
    };

    const renderFavoriteIcon = isFavorite ? (
        <FavoriteIcon
            fontSize="small"
            onClick={() => handleFav()}
            color={"error"}
        />
    ) : (
        <FavoriteBorderIcon fontSize="small" onClick={() => handleFav()} />
    );

    return <>{!isGuestSession ? renderFavoriteIcon : null}</>;
};

export default Favorite;
