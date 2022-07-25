import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import styled from "styled-components";

const RatingContainer = styled.div`
  color: gold;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

type Props = {
    rating: number;
};

const Rating: React.FC<Props> = ({ rating }) => {
    const [ratingStars, setRatingStars] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setRatingStars(() => {
            let stars = [];
            for (let i = 2; i <= 10; i += 2) {
                if (rating >= i) {
                    stars.push(<StarIcon fontSize="small" key={`${rating}-${i}`} />);
                } else if (rating < i && rating >= i - 0.5) {
                    stars.push(<StarHalfIcon fontSize="small" key={`${rating}-${i}`} />);
                } else {
                    stars.push(<StarOutlineIcon fontSize="small" key={`${rating}-${i}`} />);
                }
            }
            return stars;
        });
    }, [rating]);

    return (
        <RatingContainer>
            {ratingStars.map((el) => el)}
            <span>{`(${rating})`}</span>
        </RatingContainer>
    );
};

export default Rating;
