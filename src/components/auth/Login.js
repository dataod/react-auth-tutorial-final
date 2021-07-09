import logger from "../logger";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { BiLogInCircle } from "react-icons/bi";
import { Formik, Form } from "formik";
import React, { useState, useRef } from "react";
import MyTextField from "../forms/elements/MyTextField";
import AuthValidationSchema from "../forms/validation/AuthValidationSchema";
import { useUserContext } from "../../context/user_context";
import { Link } from "react-router-dom";
// ReCAPATCHA
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export default function Login() {
  const { login, loginError } = useUserContext();
  // ReCAPTCHA
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;
  const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY_V2;

  const [recaptcha, setRecaptcha] = useState(false);
  const [forgotRecaptcha, setForgotRecaptcha] = useState("");
  const Captcha = useRef();

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
        setForgotRecaptcha(response.data.msg);
        setRecaptcha(false);
      }
    } catch (err) {
      logger.error({ err: err }, "Login ReCAPTCHA error");
    }
  }

  return (
    <div id="login" className="form-container auth-tabcontent">
      {loginError && <Alert severity="error">{loginError}</Alert>}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={AuthValidationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // Handle submit
          if (recaptcha) {
            login({ data });
          } else {
            setForgotRecaptcha("Please complete Recaptcha test.");
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-element">
              <MyTextField
                placeholder="Email"
                label="Email"
                name="email"
                type="email"
                id="email"
                variant="outlined"
                as={TextField}
              />
            </div>

            <div className="form-element">
              <MyTextField
                placeholder="Password"
                label="Password"
                name="password"
                type="password"
                id="password"
                variant="outlined"
                as={TextField}
              />
            </div>

            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
            <div className="form-element">
              {forgotRecaptcha && (
                <Alert severity="error" variant="outlined">
                  {forgotRecaptcha}
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

            <div className="form-element form-btn">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                startIcon={<BiLogInCircle />}
              >
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
