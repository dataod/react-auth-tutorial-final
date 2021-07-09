import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function AuthBtn() {
  return (
    <div className="auth-btn">
      <Link to="/auth" title="Authentication page">
        <Button color="primary" variant="contained" type="submit">
          Login / Register
        </Button>
      </Link>
    </div>
  );
}
