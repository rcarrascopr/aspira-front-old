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
      <div
        className={`course-card-header pointer ${cardColors[props.category]}`}
        onClick={() => handleClick(props.id)}
      />
      <div className="course-card-content">
        <div
          className="course-card-info pointer"
          onClick={() => handleClick(props.id)}
        >
          {" "}
          <h2 className="dark-purple-text pointer">{props.name}</h2>
          <div>
            <p className="dark-purple-text">
              {props.total_students} Estudiantes
            </p>
            <p className="dark-purple-text">{props.total_products} Productos</p>
            <p className="dark-purple-text">Grado {props.grade}</p>
          </div>
        </div>
        <div className={`course-card-footer border-${cardColors[props.category]}`}>
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
  );
};

export default withRouter(CourseCard);
