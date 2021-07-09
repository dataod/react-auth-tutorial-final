import { useField } from "formik";
import { TextField } from "@material-ui/core";

const MyTextField = ({
  label,
  type,
  readOnly,
  helperText,
  helperError,
  variant,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      fullWidth
      {...field}
      helperText={helperText || helperError}
      error={!!errorText || !!helperError}
      label={label}
      variant={variant}
      type={type}
      inputProps={{ readOnly }}
    />
  );
};

export default MyTextField;
