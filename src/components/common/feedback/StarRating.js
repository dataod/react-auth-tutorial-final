import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { MdStarBorder, MdStarHalf, MdStar } from "react-icons/md";
import { useFeedbackContext } from "../../../context/feedback_context";

export default function StarRating({ rating, edit }) {
  const [ratingStars, setRatingStars] = useState();
  const { postFeedback } = useFeedbackContext();

  const ratingChanged = (newRating) => {
    setRatingStars(newRating);
    postFeedback({ newRating });
  };

  const reactStarsSettings = {
    size: 20,
    count: 5,
    edit: edit, // false = read only
    color: "#999999",
    activeColor: "orange",
    value: rating || ratingStars,
    a11y: true,
    isHalf: false,
    emptyIcon: <MdStarBorder />,
    halfIcon: <MdStarHalf />,
    filledIcon: <MdStar />,
  };
  return (
    <span className="rating-stars">
      <ReactStars {...reactStarsSettings} onChange={ratingChanged} />
    </span>
  );
}
