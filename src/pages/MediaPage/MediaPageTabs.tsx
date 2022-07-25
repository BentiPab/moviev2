import React, { useState } from "react";
import Tabs from "./../../components/Common/Tabs";
import MediaReviews from "./MediaReviews/MediaReviews";
import WatchProviders from "./WatchProviders/WatchProviders";
import MediaCasting from "./MediaCasting/MediaCasting";
import styled from "styled-components";

type Props = {
    mediaId: string;
    type: string;
    overview: string;
};

const StyledTabs = styled(Tabs)`
    margin-bottom: 1rem;
`

const MediaPageTabs: React.FC<Props> = ({ mediaId, type, overview }) => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs = [
        { label: "Overview", value: 0 },
        { label: "Reviews", value: 1 },
        { label: "Where To Watch", value: 2 },
        { label: "Casting", value: 3 },
    ];
    return (
        <>
            <StyledTabs
                tabs={tabs}
                value={activeTab}
                onChange={(_, newTab) => setActiveTab(newTab)}
                scrollButtons='auto'
                variant="scrollable"
            />
            {activeTab === 0 && <div>{overview}</div>}
            {activeTab === 1 && <MediaReviews mediaId={mediaId} type={type} />}
            {activeTab === 2 && <WatchProviders mediaId={mediaId} type={type} />}
            {activeTab === 3 && <MediaCasting mediaId={mediaId} type={type} />}
        </>
    );
};

export default MediaPageTabs;
