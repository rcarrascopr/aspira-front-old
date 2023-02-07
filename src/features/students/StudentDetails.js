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

  const hasCourses = (user) => {
    return (
      user 
      && props.currentSelectedSemester 
      && user.courses
      && user.courses.filter(c => c.semester_id === props.currentSelectedSemester.id).length > 0
    )
  }

  const generateCourses = () => {
    let courses = []

    if (hasCourses(props.currentStudent)) {
      courses = props.currentStudent.courses.filter(c => c.semester_id === props.currentSelectedSemester.id)
    } 
    
    return <CoursesListContainer items={courses} userType={"Student"} />
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
          <li style={{color: props.currentStudent.is_active ? "green" : "red"}}><strong>{props.currentStudent.is_active ? "Activo" : "Inactivo"}</strong></li>
        </ul>
      </div>
      <div className="student-courses-details">
        <h3 className="dark-purple-text student-details-header">
          {
            hasCourses(props.currentStudent)  
            ? "Cursos que está tomando" : "No tiene ningún curso asignado"
          }
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
