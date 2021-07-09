import React, { useEffect, useState } from "react";
import logger from "../../logger";
import ReactStars from "react-rating-stars-component";
import { MdStarBorder, MdStarHalf, MdStar } from "react-icons/md";
import axios from "axios";
import Spinner from "../Spinner";
import StarRating from "./StarRating";

export default function AverageRating() {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;

  const [ratingInfo, setRatingInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    averageStars,
    totalStars,
    totalRatingsCount,
    oneStarsCount,
    twoStarsCount,
    threeStarsCount,
    fourStarsCount,
    fiveStarsCount,
  } = ratingInfo;

  useEffect(() => {
    getRatingInfo();
  }, []);

  async function getRatingInfo() {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: `${SESSIONS_API}/rating-info`,
      });

      // Just logic for this example
      setRatingInfo(response.data[0].ratings);
      setIsLoading(false);
    } catch (err) {
      logger.error({ err: err });
      setIsLoading(false);
    }
  }

  // rounding up
  let valueRating;
  if (averageStars > 4.75) {
    valueRating = 5;
  } else if (averageStars > 4.25) {
    valueRating = 4.5;
  } else if (averageStars > 3.75) {
    valueRating = 4;
  } else if (averageStars > 3.25) {
    valueRating = 3.5;
  } else if (averageStars > 2.75) {
    valueRating = 3;
  } else if (averageStars > 2.25) {
    valueRating = 2.5;
  } else if (averageStars > 1.75) {
    valueRating = 2;
  } else if (averageStars > 1.25) {
    valueRating = 1.5;
  } else {
    valueRating = averageStars;
  }

  const reactStarsSettings = {
    size: 20,
    count: 5,
    edit: false, // read only
    color: "#999999",
    activeColor: "orange",
    value: valueRating,
    a11y: true,
    isHalf: true,
    emptyIcon: <MdStarBorder />,
    halfIcon: <MdStarHalf />,
    filledIcon: <MdStar />,
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="rating-stars tooltip">
          <ReactStars {...reactStarsSettings} />
          <div className="tooltiptext flex-column">
            <span className="flex-row align-center">
              <ReactStars
                {...reactStarsSettings}
                classNames="tooltip-avg-stars"
              />{" "}
              {averageStars} out of {totalStars}
            </span>
            <span className="flex-row">
              <p>{totalRatingsCount} total ratings</p>
            </span>

            <span className="flex-row tooltip-stars">
              5 Stars <StarRating rating={5} edit={false} /> ({fiveStarsCount})
            </span>
            <span className="flex-row tooltip-stars">
              4 Stars <StarRating rating={4} edit={false} /> ({fourStarsCount})
            </span>
            <span className="flex-row tooltip-stars">
              3 Stars <StarRating rating={3} edit={false} /> ({threeStarsCount})
            </span>
            <span className="flex-row tooltip-stars">
              2 Stars <StarRating rating={2} edit={false} /> ({twoStarsCount})
            </span>
            <span className="flex-row tooltip-stars">
              1 Stars <StarRating rating={1} edit={false} /> ({oneStarsCount})
            </span>
          </div>
        </div>
      )}
    </>
  );
}
