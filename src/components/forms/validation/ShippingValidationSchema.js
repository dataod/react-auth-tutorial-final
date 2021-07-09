import * as Yup from "yup";

const containsSpecialChars = (string) => /[&/\\+()$~%^'":*?<>{}]/g.test(string);

const ValidationSchema = Yup.object({
  first_name: Yup.string("Enter your first name")
    .required("First name is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Only latin letters allowed"
    )
    .min(2, "First name can be a minimum of 2 characters")
    .max(15, "First name can be a maximum of 15 characters"),
  middle_name: Yup.string("Enter your middle name")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Only latin letters allowed"
    )
    .min(2, "Middle name can be a minimum of 2 characters")
    .max(15, "Middle name can be a maximum of 15 characters"),
  last_name: Yup.string("Enter your last name")
    .required("Last name is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Only latin letters allowed"
    )
    .min(2, "Last name can be a minimum of 2 characters")
    .max(20, "Last name can be a maximum of 20 characters"),

  country: Yup.string("Enter your country").required("Country is required"),
  region: Yup.string("Enter your region").required("Region is required"),

  city: Yup.string("Enter city name")
    .required("City is required")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/g,
      "Only latin letters allowed"
    )
    .min(2, "City name can be a minimum of 2 characters")
    .max(25, "City name can be a maximum of 25 characters"),
  address_line_1: Yup.string("Enter your address")
    .required("Address is required")
    .test(
      "Should not contain special characters",
      "Should not contain special characters",
      (value) => !containsSpecialChars(value)
    )
    .min(2, "Address can be a minimum of 2 characters")
    .max(128, "Address can be a maximum of 128 characters"),
  address_line_2: Yup.string("Enter your address")
    .test(
      "Should not contain special characters",
      "Should not contain special characters",
      (value) => !containsSpecialChars(value)
    )
    .min(2, "Address can be a minimum of 2 characters")
    .max(128, "Address can be a maximum of 128 characters"),
  postal_code: Yup.string("Enter your postal code")
    .required("Postal code is required")
    .matches(/^[0-9]+$/, "Only numbers allowed")
    .min(3, "Postal code can be a minimum of 3 characters")
    .max(10, "Postal code can be a maximum of 10 characters"),
});

export default ValidationSchema;
