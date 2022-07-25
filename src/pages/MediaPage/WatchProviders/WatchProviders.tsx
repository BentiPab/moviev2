import { useGetWatchProvidersQuery } from "features/apiCalls/movieEndpoints";
import React from "react";
import { FormattedProvider } from "../../../model/models";
import LoadingPage from "pages/LoadingPage";
import WatchProvider from "./WatchProvider";
import styled from "styled-components";
import NoResults from "components/NoResults/NoResults";
import theme from "./../../../styleguide/theme";

type Props = {
    mediaId: string;
    type: string;
};

const WatchProvidersContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  grid-gap: 1rem;
  ${theme.breakpoints.up("md")} {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }
`;

const WatchProviders: React.FC<Props> = ({ mediaId, type }) => {
    const { isLoading, data } = useGetWatchProvidersQuery({ type, mediaId });

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!data) {
    }

    const providers = data as FormattedProvider[];

    return (
        <>
            {data ? (
                <WatchProvidersContainer>
                    {providers.map((provider) => (
                        <WatchProvider provider={provider} />
                    ))}
                </WatchProvidersContainer>
            ) : (
                <NoResults resultsType="Watch Providers" />
            )}
        </>
    );
};

export default WatchProviders;
