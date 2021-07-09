import React, { useState } from "react";
import AverageRating from "./AverageRating";
import FeedbackMessages from "./FeedbackMessages";
import { useUserContext } from "../../../context/user_context";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";
import StarRating from "./StarRating";
import { Alert } from "@material-ui/lab";
import { useFeedbackContext } from "../../../context/feedback_context";

export default function Feedback() {
  const [clicked, setClicked] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [warningMsg, setWarningMsg] = useState("");

  const {
    session: { userId, username, emailVerified, feedbackAvailable },
  } = useUserContext();

  const { postFeedback, feedbackMsg, getFeedbacks } = useFeedbackContext();

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    if (userId !== null) {
      if (!clicked) {
        if (!emailVerified) {
          setErrorMsg(
            "Please verify your email, before you can leave feedback."
          );
        } else if (!feedbackAvailable) {
          setWarningMsg("You already submitted feedback for this project.");
        } else {
          setClicked(true);
        }
      } else {
        setClicked(false);
      }
    } else {
      history.push("/auth");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailVerified && feedbackAvailable) {
      setIsSubmitting(true);
      postFeedback({ username, feedbackText });
      setSuccessMsg("Thank you for your feedback!");
      setClicked(false);
      getFeedbacks();
    } else if (!emailVerified) {
      setErrorMsg("Please verify your email, before you can leave a feedback");
      setClicked(false);
    } else if (!feedbackAvailable) {
      setWarningMsg("You already submitted feedback for this project.");
      setClicked(false);
    }
  };

  return (
    <>
      {errorMsg ? (
        <div className="form-element">
          <Alert severity="error" variant="outlined">
            {errorMsg}
          </Alert>
        </div>
      ) : (
        <>
          {successMsg ? (
            <div className="form-element">
              <Alert severity="success" variant="outlined">
                {successMsg}
              </Alert>
            </div>
          ) : (
            warningMsg && (
              <div className="form-element">
                <Alert severity="warning" variant="outlined">
                  {warningMsg}
                </Alert>
              </div>
            )
          )}
        </>
      )}

      <div className="flex-column feedback-wrapper">
        <div className="flex-row align-center feedback-header">
          <div className="flex-row">
            Average Rating :
            <AverageRating />
          </div>

          <div>
            {feedbackAvailable && (
              <button
                type="submit"
                className="form-btn custom-btn feedback-btn"
                onClick={handleClick}
              >
                Leave Feedback
              </button>
            )}
          </div>
        </div>
        {clicked && (
          <div className="flex-column justify-center feedback-input">
            {feedbackMsg && isSubmitting && (
              <div className="form-element">
                <Alert severity="warning" variant="outlined">
                  {feedbackMsg}
                </Alert>
              </div>
            )}
            <div className="feedback-textfield">
              <TextField
                id="outlined-multiline-static"
                label="Feedback"
                multiline
                rows={5}
                fullWidth
                defaultValue=""
                variant="outlined"
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>

            <div className="flex-row align-center feedback-box">
              <span className="flex-row align-center">
                <strong>Rating: </strong> <StarRating edit={true} />
              </span>

              <button
                type="submit"
                className="form-btn custom-btn feedback-btn"
                onClick={handleSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}
        <div className="feedback-body">
          <FeedbackMessages />
        </div>
      </div>
    </>
  );
}
