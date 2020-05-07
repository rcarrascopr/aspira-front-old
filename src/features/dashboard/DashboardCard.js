import React from "react";

export const DashboardCard = (props) => {
  return (
    <div className="card dark-blue">
      <img src={props.icon} alt="icon" />
      <div>
        <p className="white-text">Manejar</p>
        <h3 className="white-text">{props.title}</h3>
      </div>
    </div>
  );
};
