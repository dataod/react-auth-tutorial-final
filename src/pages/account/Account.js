import React, { useEffect } from "react";
import UserProfile from "../../components/user/account/UserProfile";
import UserInformation from "../../components/user/account/ShippingInfo";
import { checkSession } from "../../utils/session";

export default function Profile() {
  // setting a default tab on page load
  useEffect(() => {
    checkSession();
    document.getElementById("defaultOpen").click();
  }, []);

  // handling tabs
  const handleTab = (e, id) => {
    e.preventDefault();
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("profile-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("profile-tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    e.currentTarget.className += " active";
  };
  return (
    <div className="flex-column align-center">
      <div className="profile-title">
        <h2>Account</h2>
      </div>
      <div className="flex-row justify-center">
        <div className="flex-column profile-tabs">
          <button
            className="profile-tablinks btn"
            onClick={(e) => handleTab(e, "profile")}
            id="defaultOpen"
          >
            Profile
          </button>
          <button
            className="profile-tablinks btn"
            onClick={(e) => handleTab(e, "shippingInfo")}
          >
            Shipping Information
          </button>
        </div>
        <div className="flex-column">
          <UserProfile />
          <UserInformation />
        </div>
      </div>
    </div>
  );
}
