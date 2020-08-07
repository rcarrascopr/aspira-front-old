import React from "react";

import { connect } from "react-redux";

import DashboardCard from "./DashboardCard";
import cardData from "../../commons/dashboardCardInformation";

const DashboardCardsContainer = (props) => {
  const generateCards = () => {
    let cards;
    if (props.currentUser.role === "Admin") {
      cards = cardData;
    } else {
      cards = cardData.slice(2, 4);
    }
    return cards.map((data) => <DashboardCard {...data} />);
  };
  return <div className="card-group">{generateCards()}</div>;
};

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(DashboardCardsContainer);
