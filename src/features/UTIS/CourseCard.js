import React from "react";

import { cardColors } from "../../commons/courseCategoryColors";
import { withRouter } from "react-router-dom";

const CourseCard = (props) => {
  const handleClick = (id) => {
    props.history.push(`/utis/${id}`);
  };

  const handleEditClick = (id) => {
    props.history.push(`/utis/${id}/edit`);
  };
  return (
    <div className="course-card white">
      <div className={`course-card-header ${cardColors[props.category]}`} />
      <div className="course-card-content">
        <h2 className="dark-purple-text pointer" onClick={() => handleClick(props.id)}>
          {props.name}
        </h2>
        <div>
          <p className="dark-purple-text">{props.total_students} Estudiantes</p>
          <p className="dark-purple-text">{props.total_products} Productos</p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              alignItems: "center",
            }}
          >
            <img
              className="icon pointer"
              src="/assets/duplicate_icon.png"
              alt="duplicar"
              style={{ padding: "0px 10px" }}
            />
            <img
              className="icon pointer"
              src="/assets/edit_icon.png"
              alt="editar"
              onClick={() => handleEditClick(props.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CourseCard);
