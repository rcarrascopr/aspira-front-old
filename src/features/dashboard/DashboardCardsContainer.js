import React from "react";

import { connect } from "react-redux";

import DashboardCard from "./DashboardCard";
import cardData, {
  studentCardData,
} from "../../commons/dashboardCardInformation";

const DashboardCardsContainer = (props) => {
  const generateCards = () => {
    let cards;
    if (props.currentUser.role === "Admin") {
      cards = cardData;
    } else if (props.currentUser.role === "Teacher") {
      cards = cardData.slice(2, 4);
    } else {
      cards = studentCardData;
    }
    return cards.map((data) => <DashboardCard {...data} currentUser={props.currentUser}/>);
  };
  return <div className="card-group">{generateCards()} </div>;
};

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(DashboardCardsContainer);
