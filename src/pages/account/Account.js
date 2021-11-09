import React from "react";
import UserProfile from "../../components/user/account/UserProfile";


export default function Profile() {

  return (
    <div className="flex-column align-center">
      <div className="profile-title">
        <h2>Account page</h2>
      </div>
      <UserProfile/>
    </div>
  );
}
