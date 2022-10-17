import { useGetWatchProvidersQuery } from "features/apiCalls/mediaEndpoints";
import React from "react";
import LoadingPage from "pages/LoadingPage";
import WatchProvider from "./WatchProvider";
import styled from "styled-components";
import NoResults from "components/NoResults/NoResults";
import { getRegion } from "utils/intersession";

type Props = {
    mediaId: string;
    type: string;
};

const WatchProvidersContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  grid-gap: 1rem;
`;

const WatchProvidersTitle = styled.div`
    flex-basis: 100%;
    font-weight: 600;
    justify-self: center;
`

const WatchProviders: React.FC<Props> = ({ mediaId, type }) => {
    const { isLoading, data: providers } = useGetWatchProvidersQuery({
        type,
        mediaId,
    });

    const { country } = getRegion();

    if (isLoading) {
        return <LoadingPage />;
    }
    return !!providers ? (
        <WatchProvidersContainer>
            <WatchProvidersTitle>Whatch Providers in {country}</WatchProvidersTitle>
            {providers.map((provider) => (
                <WatchProvider provider={provider} />
            ))}
        </WatchProvidersContainer>
    ) : (
        <NoResults resultsType="Watch Providers" />
    );
};

export default WatchProviders;
