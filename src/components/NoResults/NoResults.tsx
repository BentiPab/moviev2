import { Alert } from "@mui/material";
import React from "react";
import { getRegion } from "utils/intersession";

type Props = {
    resultsType: "Reviews" | "Casting" | "Watch Providers";
};

const NoResults: React.FC<Props> = ({ resultsType }) => {
    const isWatchProviders = resultsType === "Watch Providers";
    const { country } = getRegion();
    const defaultMessage = `No ${resultsType} where found`;
    const finalMessage = isWatchProviders
        ? defaultMessage.concat(` in ${country}`)
        : defaultMessage;

    return (
        <Alert severity="info">{finalMessage}</Alert>
    );
};

export default NoResults;
