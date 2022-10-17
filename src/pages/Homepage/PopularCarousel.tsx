import Poster from "components/Poster/Poster";
import { useGetMediaListsQuery } from "features/apiCalls/mediaEndpoints";
import useCommonParams from "hooks/useCommonParams";
import { FC } from "react";
import Carousel from "./../../components/Common/Carousel";
import { Tooltip } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

type Props = {
    type: "movie" | "tv";
};

const Container = styled.div`
  display: flex;
  flex-direction:column;
  gap: 1rem;
  padding: 0 2rem;
`;

const StyledLink = styled(Link)`
  font-size: 2rem;
  text-transform: capitalize;
`;

const PopularCarousel: FC<Props> = ({ type }) => {
    const params = useCommonParams();
    const { data } = useGetMediaListsQuery({ type, params, list: "popular" });
    return !!data?.results ? (
        <Container>
            <Tooltip title="Discover more" placement="top">
                <StyledLink to={`/media/${type}/popular`}>{type} - Popular</StyledLink>
            </Tooltip>
            <Carousel>
                {data.results.map((posterData) => (
                    <Poster
                        posterData={posterData}
                        key={posterData.id}
                        shouldShowOverlay
                        shouldZoom
                        original
                    />
                ))}
            </Carousel>
        </Container>
    ) : null;
};

export default PopularCarousel;
