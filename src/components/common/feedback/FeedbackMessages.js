import React, { useEffect } from "react";
import Spinner from "../Spinner";
import StarRating from "./StarRating";
import { useFeedbackContext } from "../../../context/feedback_context";

export default function FeedbackMessages() {
  const { getFeedbacks, feedbackData, isLoading } = useFeedbackContext();

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {feedbackData.length > 0 ? (
            <>
              {feedbackData.map((item) => {
                const { _id, rating, username, text, postedAt } = item;

                return (
                  <div className="flex-column feedback-container" key={_id}>
                    <div className="flex-column">
                      <div className="feedback-header flex-row align-center">
                        {username}
                        <StarRating rating={rating} edit={false} />
                      </div>
                      <div className="feedback-text">
                        {text}
                        <p>{postedAt}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="feedback-text">
              There is no feedback yet. Be first to leave it!
            </div>
          )}
        </>
      )}
    </>
  );
}
