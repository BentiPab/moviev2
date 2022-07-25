import Favorite from "components/FavoriteMovie/Favorite";
import Rating from "components/Rating/Rating";
import dataActions from "features/data/actions";
import { BaseData } from "model/models";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTitleToUrl, getYear } from "utils/media";

const PosterOverlayContainer = styled.div<{ show: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  background-color: #4445;
  z-index: 5;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  opacity: 0;
  animation: opacity 200ms ease-in-out;
  pointer-events: none;

  ${(props) =>
    props.show &&
    `
    pointer-events: auto;
    cursor: pointer;
    opacity: 1;
    backdrop-filter: blur(5px);
    `}

  h4 {
    padding: 5px;
  }
`;

const OverlayInfo = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  width: 100%;
  font-size: 0.7rem;
`;

type Props = {
  show: boolean;
  media: BaseData;
};

const PosterOverlay: React.FC<Props> = ({
  show,
  media: { vote_average, id, title, type, release_date },
  media,
}) => {
  const dispatch = useDispatch();
  const year = getYear(release_date)
  const formattedTitle = getTitleToUrl(title)
  const handleRedirect = () => {
    dispatch(dataActions.setCurrentMedia(media));
  };

  return (
    <PosterOverlayContainer show={show}>
      <Link to={`/media/${type}/${formattedTitle}/${id}`} onClick={() => handleRedirect()}>
        <section>
          <h4>{`${title}`}</h4>
          <h4> {`${year}`} </h4>
        </section>
      </Link>
      <OverlayInfo className="overlay-info">
        {<Rating rating={vote_average} />}
        <Favorite mediaId={id} mediaType={type} />
      </OverlayInfo>
    </PosterOverlayContainer>
  );
};

export default PosterOverlay;
