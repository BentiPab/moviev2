import {
    Avatar,
    Button,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Review as ReviewType } from "./../../../model/models";
import { formatDate } from "./../../../utils/date";
import { useSelector } from "react-redux";
import { selectLanguage } from "./../../../features/app/selectors";
import { parseReviewToHtml, shortenReview, canBeShorten } from "./utilts";
import List from "./../../../components/Common/List";
import { getImagePath } from "./../../../utils/media";
import styled from "styled-components";

type Props = {
    review: ReviewType;
};

const ReadMoreButton = styled(Button)`
  cursor: pointer;
  &:hover {
    text-decoration: underline !important;
  }
`;

const Review: React.FC<Props> = ({ review }) => {
    const {
        author_details: { username, avatar_path },
        content,
        created_at,
    } = review;
    const language = useSelector(selectLanguage);
    const createdAt = formatDate(created_at, language);
    const reviewContent = parseReviewToHtml(content);
    const renderShowMoreButton = canBeShorten(reviewContent);
    const reviewerAvatar = getImagePath(avatar_path);
    const shortContent = shortenReview(reviewContent);
    const [showMore, setShowMore] = useState(false);

    return (
        <List>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={reviewerAvatar} alt={username} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography
                            component="div"
                            variant="body1"
                            color="white"
                            fontWeight="bold"
                        >
                            {`${username} - ${createdAt}`}
                        </Typography>
                    }
                    secondary={
                        <Typography
                            sx={{ display: "inline", wordBreak: "break-word" }}
                            component="span"
                            variant="body2"
                            color="white"
                        >
                            {!showMore && renderShowMoreButton ? shortContent : reviewContent}
                            {renderShowMoreButton && (
                                <ReadMoreButton onClick={() => setShowMore(!showMore)}>
                                    {showMore ? "Show Less" : "Show More"}
                                </ReadMoreButton>
                            )}
                        </Typography>
                    }
                />
            </ListItem>
        </List>
    );
};

export default Review;
