import React from "react";
import { Link } from "react-router-dom";
import AuthBtn from "../buttons/AuthBtn";
import { useUserContext } from "../../context/user_context";
import UserDropdown from "../user/UserDropdown";

export default function Header() {
  const {
    session: { userId },
  } = useUserContext();

  return (
    <div className="flex-column align-center">
      <div className="flex-row full-width header-container align-center">
        <Link to="/" title="App Home page">
          <img className="header-logo" src="/images/logo.png" alt="App logo" />
        </Link>
        <div className="header-auth-btn">
          {userId !== null ? <UserDropdown /> : <AuthBtn />}
        </div>
      </div>
    </div>
  );
}
