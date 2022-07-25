import { BaseData, TvShow } from "model/models";
import Poster from "components/Poster/Poster";

type Props = {
    postersData: BaseData[] | TvShow[];
};

const PosterGridContainer: React.FC<Props> = ({ postersData }) => {
    return postersData ? (
        <>
            {postersData.map((posterData) => (
                <Poster
                    posterData={posterData}
                    key={posterData.id}
                    shouldShowOverlay
                    shouldZoom
                />
            ))}
        </>
    ) : null;
};

export default PosterGridContainer;
