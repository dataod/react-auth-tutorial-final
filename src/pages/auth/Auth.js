import React, { useEffect } from "react";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import GoogleLogin from "../../components/buttons/GoogleLogin";
import { checkSession } from "../../utils/session";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../context/user_context";

export default function Auth() {
  const history = useHistory();
  const {
    session: { userId },
  } = useUserContext();

  useEffect(() => {
    checkSession();
    if (userId !== null) {
      history.push("/");
    }
    document.getElementById("defaultOpen").click();
  }, [userId, history]);

  // Handling tabs
  const handleTab = (e, id) => {
    e.preventDefault();
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("auth-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("auth-tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    e.currentTarget.className += " active";
  };

  return (
    <div className="flex-column align-center auth-container">
      <div className="spacer-5rem"></div>

      <div className="flex-row justify-center auth-tabs">
        <button
          className="auth-tablinks"
          onClick={(e) => handleTab(e, "login")}
        >
          Login
        </button>
        <button
          id="defaultOpen"
          className="auth-tablinks"
          onClick={(e) => handleTab(e, "register")}
        >
          Registration
        </button>
      </div>
      <div className="flex-column align-center">
        <Login />
        <Register />
      </div>
      <div className="flex-column align-center express-login">
        <h4>Express Login</h4>
        <div className="flex-row justify-center">
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
}
