import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useGetMediaCreditsQuery } from "features/apiCalls/mediaEndpoints";
import LoadingPage from "pages/LoadingPage";
import React, { useMemo, useRef, useState } from "react";
import { getImagePath, paginateData } from "../../../utils/media";
import { FullWidthGrid } from "styleguide/commonComponents";
import { sortBy } from "lodash";
import NoResults from "./../../../components/NoResults/NoResults";
import styled from "styled-components";
import theme from "./../../../styleguide/theme";
import ScrollToTopButton from "components/Common/ScrollToTopButton";
import AddButton from "components/Common/AddButton";
import { SCROLL_DISTANCE } from "pages/constants";

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


const MediaCasting: React.FC<Props> = (props) => {
  const { isLoading, data } = useGetMediaCreditsQuery(props);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [page, setPage] = useState<number>(1);
  const divRef = useRef<HTMLDivElement>(null);

  const sortedCast = sortBy(data?.cast, "order");

  const paginatedCast = useMemo(
    () => paginateData(sortedCast, page),
    [page, sortedCast]
  );
  const showLoadMoreButton = paginatedCast.length < sortedCast.length;

  const handleScrollToTop = () => {
    if (divRef.current) {
      divRef.current.scrollTo({ top: 0 });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      {paginatedCast ? (
        <FullWidthGrid
          ref={divRef}
          onScroll={(ev) =>
            setShowScrollToTop(ev.currentTarget.scrollTop > SCROLL_DISTANCE)
          }
        >
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
          {showLoadMoreButton && (
            <AddButton
              handleClick={() => setPage((curr) => curr + 1)}
              label="Load More"
            />
          )}
          {showScrollToTop && (
            <ScrollToTopButton handleClick={handleScrollToTop} />
          )}
        </FullWidthGrid>
      ) : (
        <NoResults resultsType="Casting" />
      )}
    </>
  );
};

export default MediaCasting;
