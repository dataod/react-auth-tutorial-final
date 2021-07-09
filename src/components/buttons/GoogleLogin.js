import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLogin() {
  const SESSIONS_API = process.env.REACT_APP_SESSIONS_API;

  const _handleSignInClick = () => {
    // Authenticate with passport
    // Open Google login page
    window.open(`${SESSIONS_API}/auth/google`, "_self");
  };
  return (
    <>
      <button
        type="button"
        className="express-login-btn"
        onClick={_handleSignInClick}
        title="Quick Login with Google"
      >
        <FcGoogle className="oauth-btn" size={45} />
      </button>
    </>
  );
}
