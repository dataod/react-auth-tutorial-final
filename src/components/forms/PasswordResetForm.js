import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import MyTextField from "./elements/MyTextField";
import axios from "axios";
import { FaLock, FaPenAlt } from "react-icons/fa";
import HomeAccountBtns from "../buttons/HomeAccountBtns";

export default function PasswordResetForm({ token }) {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;

  const [resetSuccess, setResetSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="flex-column align-center">
      {!resetSuccess ? (
        <>
          <h3 className="profile-title">
            <FaPenAlt />
            Choose new password
          </h3>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios({
                  method: "POST",
                  withCredentials: true,
                  url: `${SESSIONS_API}/password-reset`,
                  data: {
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    token: token,
                  },
                });

                if (response.status === 200) {
                  setResetSuccess(true);
                  setSuccessMsg("Your password was successfully changed.");
                }
                setSubmitting(false);
              } catch (err) {
                if (
                  err.response.status === 400 ||
                  err.response.status === 401
                ) {
                  const msg = err.response.data[0].msg;
                  setErrorMsg(msg);
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {errorMsg && (
                  <Alert severity="error" variant="outlined" className="alert">
                    {errorMsg}
                  </Alert>
                )}
                <div className="form-element">
                  <MyTextField
                    placeholder="Password"
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    as={TextField}
                  />
                </div>

                <div className="form-element">
                  <MyTextField
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    variant="outlined"
                    as={TextField}
                  />
                </div>
                <div className="form-btn">
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    className="form-btn"
                  >
                    <FaLock />
                    <p>Change Password</p>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          {successMsg && (
            <Alert severity="success" variant="outlined" className="alert">
              {successMsg}
            </Alert>
          )}
          <h3>We sent confirmation about password change to your email.</h3>
          <div className="spacer-rem"></div>
          <HomeAccountBtns />
        </>
      )}
    </div>
  );
}
