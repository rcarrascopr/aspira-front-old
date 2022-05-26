import React from "react";

import { NameCircle } from "../../commons/NameCircle";

import { Link } from "react-router-dom";

import CoursesListContainer from "../../commons/courses list/CoursesListContainer";

export default function StudentDetails(props) {
  if (!(props.currentStudent && props.currentStudent.id)) {
    return (
      <div
        className="white student-details-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#AAA" }}>Selecciona un estudiante</h2>
      </div>
    );
  }

  const generateCourses = () => {
    let courses = [...props.currentStudent.courses]

    if (props.currentSelectedSemester && courses && courses.length > 0) {
      courses = courses.filter(c => c.semester_id === props.currentSelectedSemester.id)
    } else {
      courses = []
    }
    
    return <CoursesListContainer items={courses} />
  }

  return (
    <div className="white student-details-container">
      <div className="student-profile-details dark-purple-text">
        <NameCircle
          size="huge"
          initials={
            props.currentStudent.first_name[0] +
            props.currentStudent.paternal_surname[0]
          }
        />
        <ul>
          <p>{`${props.currentStudent.first_name} ${
            props.currentStudent.paternal_surname
              ? props.currentStudent.paternal_surname
              : ""
          }
           ${
             props.currentStudent.maternal_surname
               ? props.currentStudent.maternal_surname
               : ""
           }`}</p>
          <li>Email: {props.currentStudent.email}</li>
          <li>Teléfono: {props.currentStudent.phone_number}</li>
          <li>Número de estudiante: {props.currentStudent.badge_id}</li>
          <li>Grade: {props.currentStudent.academic_level}</li>
          <li>Centro: {props.currentStudent.center.name}</li>
        </ul>
      </div>
      <div className="student-courses-details">
        <h3 className="dark-purple-text student-details-header">
          Cursos que está tomando
        </h3>
        { generateCourses() }
      </div>
      <div className="student-details-buttons dark-purple-text">
        {/* <a className="lined-button">Generar Reporte</a> */}
        <Link
          className="lined-button"
          to={`/users/${props.currentStudent.id}/edit`}
        >
          Editar
        </Link>
        {/* <a className="lined-button">
          <img src="/assets/trash_icon.png" alt="" />
        </a> */}
      </div>
    </div>
  );
}
