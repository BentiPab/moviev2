import { Stack, Typography, Divider } from "@mui/material";
import Poster from "components/Poster/Poster";
import styled from "styled-components";
import Rating from "../../components/Rating/Rating";
import { useParams } from "react-router-dom";
import Genres from "components/Genres/Genres";
import { useGetMediaDetailsQuery } from "features/apiCalls/mediaEndpoints";
import LoadingPage from "../LoadingPage";
import { getYear } from "utils/media";
import MediaPageTabs from "./MediaPageTabs";
import theme from "styleguide/theme";
import ScrollToTopButton from "components/Common/ScrollToTopButton";
import { SCROLL_DISTANCE } from './../constants';
import { useRef, useState } from "react";

const MediaPageContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  grid-area: main-content;
  padding: 1rem;

  ${theme.breakpoints.up("md")} {
    overflow: auto;
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-template-areas: "poster info";
    grid-template-rows: 600px;
    height: 100%;
    max-height: 100%;
    grid-column-gap: 1rem;
  }
`;

const MediaInfoContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  grid-area: info;
  gap: 0.5rem;
`;

export const WhiteDivider = styled(Divider)`
  background-color: white;
`;

const PosterContainer = styled.div`
  display: flex;
  justify-content: center;
  grid-area: poster;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
`;

const MediaPage = () => {
  const { id: mediaId = "", type = "" } = useParams<{
    type: string;
    id: string;
  }>();
  const { data: media } = useGetMediaDetailsQuery({ type, mediaId });
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)

  if (!media) {
    return <LoadingPage />;
  }

  const year = getYear(media.release_date);

  const handleScrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 })
    }
  }

  const runtime = type === 'movie' ? `${media.runtime}min` : media.runtime

  return (
    <MediaPageContainer ref={containerRef} onScroll={(ev) => setShowScrollToTop(ev.currentTarget.scrollTop > SCROLL_DISTANCE)}>
      <PosterContainer>
        <Poster posterData={media} original />
      </PosterContainer>
      <MediaInfoContainer>
        <Typography variant="h2">{media.title}</Typography>
        <Stack
          direction="row"
          divider={<WhiteDivider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Typography component="span" variant="body2">
            {year}
          </Typography>
          <Typography component="span" variant="body2">
            {runtime}
          </Typography>
          <Rating rating={media.vote_average} />
        </Stack>
        <Genres genres={media.genres} />
        <MediaPageTabs
          mediaId={mediaId}
          type={type}
          overview={media.overview}
        />
      </MediaInfoContainer>
      {showScrollToTop && <ScrollToTopButton handleClick={handleScrollToTop} />}
    </MediaPageContainer>
  );
};

export default MediaPage;
