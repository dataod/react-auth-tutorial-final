import React, { useState, useEffect } from "react";
import logger from "../../components/logger";
import axios from "axios";
import Spinner from "../../components/common/Spinner";
import PasswordResetForm from "../../components/forms/PasswordResetForm";
import { useDispatch } from "react-redux";
import { loginUserActionCreator } from "../../redux/reducers/userReducer";
import { Alert } from "@material-ui/lab";

export default function PasswordReset({ match }) {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;
  const [isLoading, setIsLoading] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  const {
    params: { token },
  } = match;

  useEffect(() => {
    if (token) {
      postPasswordReset();
    }
  }, [token]);

  async function postPasswordReset() {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "POST",
        withCredentials: true,
        url: `${SESSIONS_API}/password-reset/request`,
        data: {
          token: token,
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        setValidToken(true);
        dispatch(loginUserActionCreator(response.data));
      }
    } catch (err) {
      logger.error({ err: err });
      setIsLoading(false);
      setValidToken(false);

      setErrMsg("Something went wrong");
    }
  }

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {validToken ? (
            <PasswordResetForm token={token} />
          ) : (
            <div className="flex-row justify-center">
              {errMsg && (
                <Alert severity="error" variant="outlined" className="alert">
                  {errMsg}
                </Alert>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
