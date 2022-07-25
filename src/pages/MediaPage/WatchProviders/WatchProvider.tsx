import React from "react";
import { FormattedProvider } from "../../../model/models";
import { Avatar, Chip } from "@mui/material";
import { getImagePath } from "../../../utils/media";
import styled from "styled-components";

type Props = {
    provider: FormattedProvider;
};

const ProviderContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const ServiceChips = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 0.5rem;
`;

const WatchProvider: React.FC<Props> = ({
    provider: { name, path, buy, rent, stream },
}) => {
    const logoPath = getImagePath(path);
    return (
        <ProviderContainer>
            <Avatar src={logoPath} alt={name} />
            {name}
            <ServiceChips>
                {buy && <Chip color="primary" label="Buy" />}
                {rent && <Chip color="secondary" label="Rent" />}
                {stream && <Chip color="success" label="Stream" />}
            </ServiceChips>
        </ProviderContainer>
    );
};

export default WatchProvider;
