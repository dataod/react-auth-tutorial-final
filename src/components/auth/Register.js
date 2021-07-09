import logger from "../logger";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Formik, Form } from "formik";
import React, { useState, useRef } from "react";
import MyTextField from "../forms/elements/MyTextField";
import AuthValidationSchema from "../forms/validation/AuthValidationSchema";
import { useUserContext } from "../../context/user_context";
// ReCAPATCHA
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

export default function Register() {
  const { register, registerError } = useUserContext();
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
      logger.error({ err: err }, "Register postReCAPTCHA error.");
    }
  }

  return (
    <div id="register" className="form-container auth-tabcontent">
      {registerError && (
        <Alert severity="error" variant="outlined">
          {registerError}
        </Alert>
      )}
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
            register({ data });
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
                type="email"
                id="email"
                name="email"
                variant="outlined"
                as={TextField}
              />
            </div>

            <div className="form-element">
              <MyTextField
                placeholder="Password"
                label="Password"
                type="password"
                id="password"
                name="password"
                variant="outlined"
                as={TextField}
              />
            </div>
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
              >
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
