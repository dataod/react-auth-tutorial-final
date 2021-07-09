import React, { useContext, useState } from "react";
import logger from "../components/logger";
import axios from "axios";

const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;

const FeedbackContext = React.createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);

  const [rating, setRating] = useState();
  const [feedbackMsg, setFeedbackMsg] = useState("");

  async function getFeedbacks() {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        withCredentials: true,
        url: `${SESSIONS_API}/get-feedback`,
      });

      setFeedbackData(response.data);
      setIsLoading(false);
    } catch (err) {
      logger.error(err);

      setIsLoading(false);
    }
  }

  async function postFeedback({ username, newRating, feedbackText }) {
    setRating(newRating);
    if (rating && username) {
      try {
        await axios({
          method: "POST",
          withCredentials: true,
          url: `${SESSIONS_API}/post-feedback`,
          data: {
            username,
            project_name: "react-nodejs",
            rating,
            text: feedbackText,
          },
        });
      } catch (err) {
        logger.error(err);
      }
    } else if (rating === undefined) {
      setFeedbackMsg("Please rate the project.");
    }
  }

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
        getFeedbacks,
        feedbackData,
        postFeedback,
        feedbackMsg,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  return useContext(FeedbackContext);
};
