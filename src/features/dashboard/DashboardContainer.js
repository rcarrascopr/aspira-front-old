import React from "react";
import DashboardCardsContainer from "./DashboardCardsContainer";

import "./dashboard.css";

export const DashboardContainer = () => {
  return (
    <section className="dashboard light-purple">
      <div className="main-dashboard">
        <h1 className="white-text">Dashboard</h1>
        <DashboardCardsContainer />
        <hr />
        <img src="/assets/logo_aspira.png" alt="" />
        <hr />
      </div>
    </section>
  );
};
