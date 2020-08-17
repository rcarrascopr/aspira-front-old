import React from "react";

import { Link } from "react-router-dom";

export default function StudentsRegistedCard(props) {
  return (
    <div className="card">
      <h3 className="dark-purple-text">
        {props.students ? props.students.length : 0} Estudiantes matriculados
      </h3>
      <Link
        to={`/cursos/${props.courseId}/calificaciones`}
        className="primary-btn"
      >
        <img className="grade-icon" src="/assets/grades_icon.png" alt="" />
        {"  "}Ver calificaciones
      </Link>
    </div>
  );
}
