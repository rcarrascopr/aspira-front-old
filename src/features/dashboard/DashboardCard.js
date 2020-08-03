import React from "react";

import { Link, withRouter } from "react-router-dom";

const DashboardCard = (props) => {
  const handleClick = (event) => {
    event.preventDefault();
    props.history.push(`/${props.title.toLowerCase()}`);
  };
  return (
    <div className="dashboard-card dark-blue" onClick={handleClick}>
      <img src={props.icon} alt="icon" />
      <div>
        <p className="white-text">Manejar</p>
        <h3>
          <a className="white-text">{props.title}</a>
        </h3>
      </div>
    </div>
  );
};

export default withRouter(DashboardCard);
