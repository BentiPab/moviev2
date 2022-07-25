import { Tab as MuiTab, TabProps } from "@mui/material";
import React from "react";
import styled from "styled-components";

const StyledTab = styled(MuiTab)``;

const Tab: React.FC<TabProps> = ({ ...props }) => {
    return <StyledTab {...props} />;
};

export default Tab;
