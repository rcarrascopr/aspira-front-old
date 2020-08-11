import React from "react";

import { withRouter } from "react-router-dom";

function UTISItem(props) {
  const handleClick = () => {
    props.history.push(
      `/cursos/${props.match.params.id}/utis/${props.utis.id}`
    );
  };

  return (
    <div className="utis-item" key={props.utis.id}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "850px",
        }}
      >
        <div
          style={{ display: "flex" }}
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
        <img
          className="course-icon"
          src="/assets/edit_icon.png"
          alt="Edit UTIS"
          onClick={() => props.generateModal(props.utis.id)}
        />
        <img
          className="course-icon"
          src="/assets/trash_icon.png"
          alt="Delete UTIS"
          onClick={() => props.generateDeleteModal(props.utis.id)}
        />
      </div>
    </div>
  );
}

export default withRouter(UTISItem);
