import React from "react";

import { cardColors } from "../../commons/courseCategoryColors";
import { withRouter } from "react-router-dom";

const CourseCard = (props) => {
  const handleClick = (id) => {
    props.history.push(`/utis/${id}`);
  };
  return (
    <div className="course-card white" onClick={() => handleClick(props.id)}>
      <div className={`course-card-header ${cardColors[props.category]}`} />
      <div className="course-card-content">
        <h2 className="dark-purple-text">{props.name}</h2>
        <div>
          <p className="dark-purple-text">
            {props.students ? props.students.length : 0} Estudiantes
          </p>
          <p className="dark-purple-text">
            {props.products ? props.products.length : 0} Productos
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CourseCard);
