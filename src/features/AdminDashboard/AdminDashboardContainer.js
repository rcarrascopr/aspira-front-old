import React, { useState } from "react";
import DashboardContainer from "../dashboard-2/DashboardContainer";
import ReportsContainer from "../reports/ReportsContainer";

function AdminDashboardContainer() {
  const [dashboardState, setDashboardState] = useState("reports");

  const generateDashboard = () => {
    if (dashboardState === "reports") {
      return <ReportsContainer updateDashboardState={updateDashboardState} />;
    } else {
      return <DashboardContainer updateDashboardState={updateDashboardState} />;
    }
  };

  const updateDashboardState = (newState) => {
    setDashboardState(newState);
  };

  return <>{generateDashboard()}</>;
}

export default AdminDashboardContainer;
