import parse from "html-react-parser";

export const parseReviewToHtml = (reviewContent: string) =>
    parse(reviewContent).toString();

export const shortenReview = (review: string) =>
    review.split(" ").slice(0, 49).join(" ").concat("...");

export const canBeShorten = (review: string) => review.split(" ").length > 50;
