import { Stack, Typography, Divider } from "@mui/material";
import Poster from "components/Poster/Poster";
import styled from "styled-components";
import Rating from "../../components/Rating/Rating";
import { useParams } from "react-router-dom";
import Genres from "components/Genres/Genres";
import { useGetMediaDetailsQuery } from "features/apiCalls/movieEndpoints";
import LoadingPage from "../LoadingPage";
import { getYear } from "utils/media";
import MediaPageTabs from "./MediaPageTabs";
import theme from "styleguide/theme";
import ScrollToTopButton from "components/Common/ScrollToTopButton";
import useScrollToTop from "./../../hooks/useScrollToTop";

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

const ID = "media-page";

const MediaPage = () => {
  const { id: mediaId = "", type = "" } = useParams<{
    type: string;
    id: string;
  }>();
  const { data: media } = useGetMediaDetailsQuery({ type, mediaId });
  const showScrollToTop = useScrollToTop(ID);

  if (!media) {
    return <LoadingPage />;
  }

  const year = getYear(media.release_date);

  return (
    <MediaPageContainer id={ID}>
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
            {media.runtime}min
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
      {showScrollToTop && <ScrollToTopButton id={ID} />}
    </MediaPageContainer>
  );
};

export default MediaPage;
