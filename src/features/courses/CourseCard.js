import React from "react";

import { cardColors } from "../../commons/courseCategoryColors";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

const CourseCard = (props) => {
  const handleClick = (id) => {
    props.history.push(`/cursos/${id}`);
  };

  const handleEditClick = (id) => {
    props.history.push(`/cursos/${id}/edit`);
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
            <p className="dark-purple-text">
              Facultad:{" "}
              {`${props.teacher.first_name} ${props.teacher.paternal_surname}`}
            </p>
            <p className="dark-purple-text">Grado {props.grade}</p>
            {props.center_name && (
              <p className="dark-purple-text">Centro: {props.center_name}</p>
            )}
          </div>
        </div>
        {props.currentUser.role === "Admin" && (
          <div
            className={`course-card-footer border-${
              cardColors[props.category]
            }`}
          >
            {/* <img
            className="icon pointer"
            src="/assets/duplicate_icon.png"
            alt="duplicar"
            style={{ padding: "0px 10px" }}
          /> */}
            <img
              className="icon pointer"
              src="/assets/edit_icon.png"
              alt="editar"
              onClick={() => handleEditClick(props.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(withRouter(CourseCard));
