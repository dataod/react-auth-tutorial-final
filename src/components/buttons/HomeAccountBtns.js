import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";

export default function HomeAccountBtns() {
  return (
    <div className="form-element form-btn btn-container">
      <Link to="/">
        <Button
          color="primary"
          variant="contained"
          type="button"
          startIcon={<FaHome />}
        >
          Home
        </Button>
      </Link>
      <Link to="/account">
        <Button
          color="primary"
          variant="contained"
          type="button"
          startIcon={<FaUser />}
        >
          Account
        </Button>
      </Link>
    </div>
  );
}
