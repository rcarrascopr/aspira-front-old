import React from "react";

import { Link } from "react-router-dom";

export const DashboardCard = (props) => {
  return (
    <div className="dashboard-card dark-blue">
      <img src={props.icon} alt="icon" />
      <div>
        <p className="white-text">Manejar</p>
        <h3>
          <Link to={`/${props.title.toLowerCase()}`} className="white-text">
            {props.title}
          </Link>
        </h3>
      </div>
    </div>
  );
};
