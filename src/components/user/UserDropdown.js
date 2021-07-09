import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/user_context";
import { FaChevronDown } from "react-icons/fa";

export default function UserDropdown() {
  const {
    logout,
    session: { email, username },
  } = useUserContext();
  return (
    <div className="user-dropdown">
      <div className="user-dropdown-btn flex-row justify-center">
        {username ? (
          <>
            {username} <FaChevronDown className="user-chevron" />
          </>
        ) : (
          <>
            {email} <FaChevronDown className="user-chevron" />
          </>
        )}
      </div>
      <ul className="user-dropdown-content">
        <Link to="/account">
          <li className="dropdown-logout-btn">Account</li>
        </Link>
        <li>
          <button onClick={logout} className="dropdown-logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
