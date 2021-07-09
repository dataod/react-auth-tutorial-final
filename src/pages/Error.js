import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex-column align-center error-page-container">
      <div className="spacer-2rem"></div>
      <h1>404</h1>
      <div className="spacer-2rem"></div>
      <h2>Sorry, the page you requested was not found.</h2>
      <div className="spacer-5rem"></div>
      <Link to="/" title="Return toh home page">
        <Button color="primary" variant="contained" type="button">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
