import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { cardColors } from "../../commons/courseCategoryColors";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./courseCard.css";

function CourseCard(props) {
  const {
    id,
    category,
    name,
    total_students,
    instructor,
    academic_level,
    history,
    currentUser,
  } = props;

  const [elevation, setElevation] = useState(3);

  const handleClick = (id) => {
    history.push(`/cursos/${id}`);
  };

  const handleEditClick = (id) => {
    history.push(`/cursos/${id}/edit`);
  };

  return (
    <Paper
      id={id}
      className="course-card-2 pointer"
      elevation={elevation}
      onMouseEnter={() => setElevation(8)}
      onMouseLeave={() => setElevation(3)}
      onClick={() => handleClick(id)}
    >
      <div className={`course-card-2-title ${cardColors[category]}`}>
        <p className="medium-title">{name}</p>
      </div>
      <div>
        <p className="dark-purple-text">{total_students} Estudiantes</p>
        <p className="dark-purple-text">
          Facultad:{" "}
          {instructor &&
            `${instructor.first_name} ${instructor.paternal_surname}`}
        </p>
        <p className="dark-purple-text">Grado {academic_level}</p>
      </div>
      {currentUser.role === "Admin" && (
        <div className={`course-card-footer`}>
          <img
            className="icon pointer"
            src="/assets/edit_icon.png"
            alt="editar"
            onClick={() => handleEditClick(id)}
          />
        </div>
      )}
    </Paper>
  );
}

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

export default connect(mapStateToProps)(withRouter(CourseCard));
