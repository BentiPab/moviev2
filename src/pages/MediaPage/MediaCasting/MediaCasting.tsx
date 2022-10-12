import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useGetMediaCreditsQuery } from "features/apiCalls/movieEndpoints";
import LoadingPage from "pages/LoadingPage";
import React, { useMemo, useState } from "react";
import { getImagePath, paginateData } from "../../../utils/media";
import { FullWidthGrid } from "styleguide/commonComponents";
import { sortBy } from "lodash";
import NoResults from "./../../../components/NoResults/NoResults";
import styled from "styled-components";
import theme from "./../../../styleguide/theme";
import useScrollToTop from "./../../../hooks/useScrollToTop";
import ScrollToTopButton from "components/Common/ScrollToTopButton";
import AddButton from "components/Common/AddButton";

type Props = {
  mediaId: string;
  type: string;
};

const StyledCard = styled(Card)`
  display: flex;
  min-width: 100%;

  .MuiCardMedia-root {
    max-width: 25%;
  }

  ${theme.breakpoints.up("md")} {
    display: block;
    .MuiCardMedia-root {
      max-width: 100%;
    }
  }
`;

const ID = "media-casting";

const MediaCasting: React.FC<Props> = (props) => {
  const { isLoading, data } = useGetMediaCreditsQuery(props);
  const showScrollToTop = useScrollToTop(ID);
  const [page, setPage] = useState<number>(1)

  const sortedCast = sortBy(data?.cast, "order");

  const paginatedCast = useMemo(() => paginateData(sortedCast, page), [page, sortedCast])
  const showLoadMoreButton = paginatedCast.length < sortedCast.length


  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {paginatedCast ? (
        <FullWidthGrid id={ID}>
          {paginatedCast.map((act) => (
            <StyledCard>
              <CardMedia
                component="img"
                src={getImagePath(act.profile_path, false, true)}
                alt={act.name}
              />
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {act.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {act.character}
                </Typography>
              </CardContent>
            </StyledCard>
          ))}
          {showLoadMoreButton && <AddButton handleClick={() => setPage((curr) => curr + 1)} label='Load More' />}
          {showScrollToTop && <ScrollToTopButton id={ID} />}
        </FullWidthGrid>
      ) : (
        <NoResults resultsType="Casting" />
      )}
    </>
  );
};

export default MediaCasting;
