import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useGetMediaCreditsQuery } from "features/apiCalls/movieEndpoints";
import LoadingPage from "pages/LoadingPage";
import React from "react";
import { getImagePath } from "../../../utils/media";
import { FullWidthGrid } from "styleguide/commonComponents";
import { sortBy } from "lodash";
import NoResults from "./../../../components/NoResults/NoResults";
import styled from "styled-components";
import theme from "./../../../styleguide/theme";

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

const StyledFullWidthGrid = styled(FullWidthGrid)`
  display: flex;
  flex-flow: row wrap;

  ${theme.breakpoints.up("md")} {
    display: grid;
  }
`;

const MediaCasting: React.FC<Props> = (props) => {
  const { isLoading, data } = useGetMediaCreditsQuery(props);

  const sortedCast = sortBy(data?.cast, "order");

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {sortedCast ? (
        <StyledFullWidthGrid>
          {sortedCast.map((act) => (
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
        </StyledFullWidthGrid>
      ) : (
        <NoResults resultsType="Casting" />
      )}
    </>
  );
};

export default MediaCasting;
