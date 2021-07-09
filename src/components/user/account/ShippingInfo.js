import React, { useState } from "react";
import { Formik, Form } from "formik";
import { TextField, Button } from "@material-ui/core";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import MyTextField from "../../forms/elements/MyTextField";
import ShippingValidationSchema from "../../forms/validation/ShippingValidationSchema";
import axios from "axios";
import { useUserContext } from "../../../context/user_context";
import { Alert } from "@material-ui/lab";

export default function ShippingInfo() {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;
  const {
    session: { shippingInfo },
  } = useUserContext();

  const [edit, setEdit] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleEdit = () => {
    setEdit(true);
    setSuccessMsg("");
  };
  const handleCancel = () => {
    setEdit(false);
    setSuccessMsg("");
  };
  return (
    <div id="shippingInfo" className="profile-tabcontent">
      <Formik
        initialValues={{
          first_name: `${shippingInfo.first_name}` || "",
          middle_name: `${shippingInfo.middle_name}` || "",
          last_name: `${shippingInfo.last_name}` || "",
          country: `${shippingInfo.country}` || "",
          region: `${shippingInfo.region}` || "",
          city: `${shippingInfo.city}` || "",
          address_line_1: `${shippingInfo.address_line_1}` || "",
          address_line_2: `${shippingInfo.address_line_2}` || "",
          postal_code: `${shippingInfo.postal_code}` || "",
        }}
        validationSchema={ShippingValidationSchema}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);

          try {
            const shippingData = await axios({
              method: "POST",
              withCredentials: true,
              url: `${SESSIONS_API}/account/information`,
              data: {
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name,
                country: data.country,
                region: data.region,
                city: data.city,
                address_line_1: data.address_line_1,
                address_line_2: data.address_line_2,
                postal_code: data.postal_code,
              },
            });
            if (shippingData.status === 200) {
              setSuccessMsg(shippingData.data.msg);
              setSubmitting(false);
              setEdit(false);
            }
          } catch (err) {
            console.error(err.response);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleBlur,
          handleChange,
        }) => (
          <Form>
            {successMsg && (
              <Alert severity="success" className="success-alert">
                {successMsg}
              </Alert>
            )}
            <div className="form-element">
              <MyTextField
                placeholder="First name*"
                label="First name*"
                name="first_name"
                as={TextField}
                variant="filled"
                readOnly={!edit}
              />
            </div>
            <div className="form-element">
              <MyTextField
                placeholder="Middle name"
                label="Middle name"
                name="middle_name"
                as={TextField}
                variant="filled"
                readOnly={!edit}
              />
            </div>
            <div className="form-element">
              <MyTextField
                placeholder="Last name*"
                label="Last name*"
                name="last_name"
                as={TextField}
                variant="filled"
                readOnly={!edit}
              />
            </div>
            <div className="form-element from-country-region">
              <CountryDropdown
                name="country"
                value={values.country}
                onChange={(_, e) => handleChange(e)}
                onBlur={handleBlur}
                className="select-dropdown"
                disabled={!edit}
              />

              {errors.country && touched.country ? (
                <div className="form-error">{errors.country}</div>
              ) : null}
            </div>
            <div className="form-element from-country-region">
              <RegionDropdown
                name="region"
                country={values.country}
                value={values.region}
                onChange={(_, e) => handleChange(e)}
                onBlur={handleBlur}
                className="select-dropdown"
                disabled={!edit}
              />
              {errors.region && touched.region ? (
                <div className="form-error">{errors.region}</div>
              ) : null}
            </div>
            <div className="form-element">
              <MyTextField
                placeholder="City*"
                label="City*"
                name="city"
                as={TextField}
                variant="filled"
                readOnly={!edit}
              />
            </div>
            <div className="form-element">
              <MyTextField
                placeholder="Address*"
                label="Address*"
                name="address_line_1"
                as={TextField}
                variant="filled"
                readOnly={!edit}
              />
            </div>
            <div className="form-element">
              <MyTextField
                placeholder="Additional address"
                label="Additional address"
                name="address_line_2"
                as={TextField}
                variant="filled"
                readOnly={!edit}
              />
            </div>

            <div className="form-element">
              <MyTextField
                placeholder="Postal code*"
                label="Postal code*"
                name="postal_code"
                as={TextField}
                variant="filled"
                readOnly={!edit}
              />
            </div>
            {!edit ? (
              <div className="form-element form-btn btn-container">
                <button
                  className="custom-btn"
                  type="button"
                  onClick={() => handleEdit()}
                >
                  Edit Information
                </button>
              </div>
            ) : (
              <div className="form-element form-btn btn-container">
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save Changes
                </Button>
                <button
                  className="custom-btn"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleCancel()}
                >
                  Cancel Changes
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
