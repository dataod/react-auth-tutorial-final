import React from "react";
import Feedback from "../components/common/feedback/Feedback";

export default function Home() {
  return (
    <div className="flex-column align-center">
      <img
        src="/images/logo.png"
        alt="React + Node.js"
        className="react-nodejs-logo"
      />

      <Feedback />
    </div>
  );
}
