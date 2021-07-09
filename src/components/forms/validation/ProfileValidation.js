import * as Yup from "yup";

const ProfileValidationSchema = Yup.object({
  username: Yup.string("Enter new username")
    .required("Username is required")
    .matches(
      /^([A-Za-z0-9\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Only numbers and latin letters allowed"
    )
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters"),
  password: Yup.string()
    .required("Please enter new password")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default ProfileValidationSchema;
