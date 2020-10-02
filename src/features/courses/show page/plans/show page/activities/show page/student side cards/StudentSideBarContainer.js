import React from "react";

import StatusCard from "./StatusCard";
import ActivityCompletedCard from "./ActivityCompletedCard";
import SubmitProductCard from "./SubmitProductCard";
import EvaluationCard from "./EvaluationCard";

import "./StudentSideBar.css";

export default function StudentSideBarContainer(props) {
  return (
    <div className="student-side-bar-container">
      {/* <StatusCard /> */}
      {/* <ActivityCompletedCard /> */}
      <SubmitProductCard
        product={props.currentActivity.product}
        currentUser={props.currentUser}
      />
      <EvaluationCard
        product={props.currentActivity.product}
        currentUser={props.currentUser}
      />
    </div>
  );
}
