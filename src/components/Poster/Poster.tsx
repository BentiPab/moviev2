import { Skeleton } from "@mui/material";
import { BaseData, TvShow } from "model/models";
import { useState } from "react";
import styled from "styled-components";
import theme from "styleguide/theme";
import { getImagePath } from "../../utils/media";
import predifinedPoster from "../../assets/predifinedPoster.png";
import PosterOverlay from "./PosterOverlay";
import { getTitleToUrl } from "utils/media";
import { useNavigate } from "react-router-dom";
import useIsMobile from "./../../hooks/useIsMobile";

export type PosterProps = {
    posterData: BaseData | TvShow;
    shouldShowOverlay?: boolean;
    shouldZoom?: boolean;
    original?: boolean;
    mainPage?: boolean;
};

export const PosterImage = styled.img<{ ready: boolean; zoom?: boolean }>`
  display: ${(props) => (props.ready ? "inline-block" : "none")};
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${(props) =>
        props.zoom &&
        `transform: scale(1.3);
        object-fit: cover;
    `};
`;

export const PosterContainer = styled.div<{ mainPage?: boolean }>`
  width: ${({ mainPage }) => (mainPage ? "10rem" : "15rem")};
  max-height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  ${theme.breakpoints.up("md")} {
    width: 100%;
    height: auto;
  }
`;

const ImageSkeleton: React.FC<{ original?: boolean }> = ({ original }) => {
    const backgroundColor = theme.palette.grey[400].toString();
    return (
        <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ bgcolor: backgroundColor, minHeight: original ? "400px" : "230px" }}
            height="100%"
        />
    );
};

const Poster: React.FC<PosterProps> = ({
    posterData: { poster_path: posterPath, title, id, type },
    posterData,
    shouldShowOverlay,
    shouldZoom,
    original,
    mainPage,
}) => {
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const path = !imageError
        ? getImagePath(posterPath, original)
        : predifinedPoster;
    const [showOverlay, setShowOverlay] = useState(false);
    const isMobile = useIsMobile();
    const formattedTitle = getTitleToUrl(title);
    const navigate = useNavigate();
    return (
        <PosterContainer
            mainPage={mainPage}
            onMouseEnter={() => !isMobile && setShowOverlay(true)}
            onMouseLeave={() => !isMobile && setShowOverlay(false)}
            onClick={() => isMobile && setShowOverlay(!showOverlay)}
        >
            {loading && !imageError && <ImageSkeleton original={original} />}
            <PosterImage
                onError={() => setImageError(true)}
                ready={!loading}
                src={path}
                onLoad={(e) =>
                    (e.target as HTMLImageElement).complete && setLoading(false)
                }
                zoom={showOverlay && shouldZoom}
                onClick={() =>
                    showOverlay && navigate(`/media/${type}/${formattedTitle}/${id}`)
                }
            />
            {!loading && shouldShowOverlay && (
                <PosterOverlay media={posterData} show={showOverlay} />
            )}
        </PosterContainer>
    );
};

export default Poster;
