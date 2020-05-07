import React from "react";

import { DashboardCard } from "./DashboardCard";
import cardData from "../../commons/dashboardCardInformation";

export const DashboardCardsContainer = () => {
  const generateCards = () => {
    return cardData.map((data) => <DashboardCard {...data} />);
  };
  return <div className="card-group">{generateCards()}</div>;
};
