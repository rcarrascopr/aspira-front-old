import React from "react";

import { cardColors } from "../../commons/courseCategoryColors";
import { withRouter } from "react-router-dom";

const CourseCard = (props) => {
  const handleClick = () => {
    props.history.push("/");
  };
  return (
    <div className="course-card white" onClick={handleClick}>
      <div className={`course-card-header ${cardColors[props.category]}`} />
      <div className="course-card-content">
        <h2 className="dark-purple-text">{props.name}</h2>
        <div>
          <p className="dark-purple-text">
            {props.students.length} Estudiantes
          </p>
          <p className="dark-purple-text">{props.products}6 Productos</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CourseCard);
