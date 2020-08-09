import React from "react";

export default function UTISItem(props) {
  return (
    <div className="utis-item" key={props.utis.id}>
      <h2 className="dark-purple-text" style={{ height: "80px" }}>
        {props.utis.name}
      </h2>
      <div className="utis-item-product">
        <p>{props.utis.total_activities} Actividades</p>
      </div>
    </div>
  );
}
