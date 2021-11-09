import React, { useState, useRef, useEffect } from "react";
import logger from "../../components/logger";
import { Formik, Form } from "formik";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import { TextField, Button } from "@material-ui/core";
import MyTextField from "../../components/forms/elements/MyTextField";
import { Alert } from "@material-ui/lab";
import { checkSession } from "../../utils/session";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../context/user_context";
// ReCAPATCHA
import ReCAPTCHA from "react-google-recaptcha";

export default function ForgotPassword() {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;
  const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY_V2;

  const [recaptcha, setRecaptcha] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const Captcha = useRef();

  const history = useHistory();

  const {
    session: { userId },
  } = useUserContext();

  useEffect(() => {
    checkSession();
    if (userId !== null) {
      history.push("/");
    }

  }, [userId, history]);

  async function postReCAPTCHA(token) {
    setRecaptcha(false);
    try {
      const response = await axios({
        method: "POST",
        withCredentials: true,
        url: `${SESSIONS_API}/recaptcha-verify`,
        data: {
          captcha: token,
        },
      });

      if (response.data.success) {
        setRecaptcha(true);
      } else {
        setErrorMsg(response.data.msg);
        setRecaptcha(false);
      }
    } catch (err) {
      logger.error({ err: err });
    }
  }

  return (
    <div className="flex-column align-center">
      <h2 className="profile-title">
        <RiLockPasswordFill /> Password Reset
      </h2>
      {successMsg ? (
        <div className="form-element">
          {successMsg && (
            <Alert severity="success" variant="outlined">
              {successMsg}
            </Alert>
          )}
        </div>
      ) : (
        <h4>Provide your email address</h4>
      )}

      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (recaptcha) {
            try {
              const response = await axios({
                method: "POST",
                withCredentials: true,
                url: `${SESSIONS_API}/forgot-pw`,
                data: {
                  email: values.email,
                },
              });

              if (response.status === 200) {
                setSuccessMsg(response.data.msg);

                setSubmitting(false);
              }
            } catch (err) {
              // console.error(err);
              if (err.response.status === 400 || err.response.status === 401) {
                const msg = err.response.data.msg;

                setSubmitting(false);

                setErrorMsg(msg);
              }
            }
          } else {
            setErrorMsg("Please complete Recaptcha test.");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex-column">
            <div className="align-center">
              <div className="form-element">
                <MyTextField
                  placeholder="Email"
                  label="Email"
                  name="email"
                  type="email"
                  id="email"
                  as={TextField}
                  variant="outlined"
                />
              </div>
            </div>

            <div className="form-element">
              {errorMsg && (
                <Alert severity="error" variant="outlined">
                  {errorMsg}
                </Alert>
              )}
            </div>
            <div className="flex-column align-center form-element">
              <ReCAPTCHA
                sitekey={RECAPTCHA_KEY}
                onChange={(token) => postReCAPTCHA(token)}
                ref={Captcha}
              />
            </div>

            <div className="form-element form-btn btn-container">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                Request reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
