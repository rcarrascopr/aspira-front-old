import React from "react";

import { withRouter } from "react-router-dom";

function UTISItem(props) {
  const handleClick = () => {
    props.history.push(`/cursos/${props.match.params.id}/utis/${props.utis.id}`);
  };

  return (
    <div
      className="utis-item"
      key={props.utis.id}
      onClick={() => {
        handleClick();
      }}
    >
      <h2 className="dark-purple-text" style={{ height: "80px" }}>
        {props.utis.name}
      </h2>
      <div className="utis-item-product">
        <p>{props.utis.total_activities} Actividades</p>
      </div>
    </div>
  );
}

export default withRouter(UTISItem);
