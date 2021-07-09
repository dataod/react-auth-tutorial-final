import React, { useEffect, useState } from "react";
import logger from "../../logger";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Formik, Form } from "formik";
import MyTextField from "../../forms/elements/MyTextField";
import { useUserContext } from "../../../context/user_context";
import ProfileValidationSchema from "../../forms/validation/ProfileValidation";
import Spinner from "../../common/Spinner";
import axios from "axios";

export default function UserProfile({ navigator }) {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;
  const {
    session: { username, email, emailVerified },
  } = useUserContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [verified, setVerified] = useState("");
  const [unverified, setUnverified] = useState("");

  useEffect(() => {
    if (!emailVerified) {
      setUnverified("Not Verified");
    } else {
      setVerified("Verified");
    }
  }, []);

  return (
    <div id="profile" className="profile-tabcontent">
      {username === undefined || username === null ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
            username: `${username}`,
            email: `${email}`,
            password: "",
            confirmPassword: "",
          }}
          validationSchema={ProfileValidationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);

            try {
              const passwordData = await axios({
                method: "POST",
                withCredentials: true,
                url: `${SESSIONS_API}/account/password`,
                data: {
                  password: data.password,
                  confirmPassword: data.confirmPassword,
                },
              });

              if (passwordData.status === 200) {
                setSuccessMsg(passwordData.data.msg);
              }
              setSubmitting(false);
            } catch (err) {
              logger.error({ err: err }, "Password change error.");
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-element">
                <MyTextField
                  placeholder="Username"
                  label="Username"
                  name="username"
                  as={TextField}
                  readOnly={true}
                  variant="filled"
                />
              </div>
              <div className="form-element">
                <MyTextField
                  placeholder="Email"
                  label="Email"
                  name="email"
                  as={TextField}
                  readOnly={true}
                  helperText={verified}
                  helperError={unverified}
                  variant="filled"
                />
              </div>
              <div className="spacer-2rem"></div>
              {successMsg && (
                <Alert severity="success" className="success-alert">
                  {successMsg}
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
              <div className="form-element form-btn">
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  className="form-btn"
                >
                  Change Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
