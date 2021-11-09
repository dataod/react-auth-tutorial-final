import React, { useState, useEffect } from "react";
import { loginUserActionCreator } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import Spinner from "../../components/common/Spinner";
import { Alert } from "@material-ui/lab";
import HomeAccountBtns from "../../components/buttons/HomeAccountBtns";

export default function EmailVerification({ match }) {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

  const {
    params: { token },
  } = match;

  useEffect(() => {
    if (token) {
      postVerification();
    }
    // eslint-disable-next-line
  }, [token]);

  async function postVerification() {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "POST",
        withCredentials: true,
        url: `${SESSIONS_API}/email-verification`,
        data: {
          token: token,
        },
      });
      setVerified(true);

      if (response.status === 200) {
        setSuccess("Thank you for verifying your email.");
      } else {
        dispatch(loginUserActionCreator(response.data));
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response.data.msg);
    }
  }

  return (
    <>
      <div className="spacer-5rem"></div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {verified ? (
            <div className="flex-column align-center">
              {success && (
                <Alert
                  severity="success"
                  variant="outlined"
                  className="success-alert"
                >
                  {success}
                </Alert>
              )}
              <HomeAccountBtns />
            </div>
          ) : (
            <div className="flex-column align-center">
              {error && (
                <Alert
                  severity="error"
                  variant="outlined"
                  className="success-alert"
                >
                  {error}
                </Alert>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
