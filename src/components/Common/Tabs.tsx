import { Tabs as MuiTabs, TabsProps } from "@mui/material";
import React from "react";
import Tab from "./Tab";
import styled from "styled-components";

type ExtendedTabsProps = TabsProps & {
    tabs: { label: string; value: number }[];
    onChange: (e: React.ChangeEvent<HTMLElement>, newTab: number) => void;
};

const StyledTabs = styled(MuiTabs)`
  .MuiTab-textColorPrimary {
    color: white;
  }

`;

const Tabs: React.FC<ExtendedTabsProps> = ({ tabs, onChange, ...props }) => {
    return (
        <StyledTabs onChange={onChange} {...props}>
            {tabs.map((tab) => (
                <Tab label={tab.label} value={tab.value} />
            ))}
        </StyledTabs>
    );
};

export default Tabs;
