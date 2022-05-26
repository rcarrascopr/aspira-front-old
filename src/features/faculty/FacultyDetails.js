import React from "react";

import { NameCircle } from "../../commons/NameCircle";

import { Link } from "react-router-dom";

import CoursesListContainer from "../../commons/courses list/CoursesListContainer";

export default function FacultyDetails(props) {
  if (!(props.currentFaculty && props.currentFaculty.id)) {
    return (
      <div
        className="white student-details-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "#AAA" }}>Selecciona un usuario</h2>
      </div>
    );
  }

  const generateCourses = () => {
    let courses = [...props.currentFaculty.courses]

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
            props.currentFaculty.first_name[0] +
            props.currentFaculty.paternal_surname[0]
          }
        />
        <ul>
          <p>{`${props.currentFaculty.first_name} ${
            props.currentFaculty.paternal_surname
              ? props.currentFaculty.paternal_surname
              : ""
          } ${
            props.currentFaculty.maternal_surname
              ? props.currentFaculty.maternal_surname
              : ""
          }`}</p>
          <li>Email: {props.currentFaculty.email}</li>
          <li>Municipio: {props.currentFaculty.residence_municipality}</li>
          <li>Título: {props.currentFaculty.role}</li>
          <li>Centro: {props.currentFaculty.center_name}</li>
        </ul>
      </div>
      <div className="student-courses-details">
        {props.currentFaculty.courses && props.currentFaculty.courses.length > 0 && (
          <>
            <h3 className="dark-purple-text student-details-header">
              Cursos que está ofreciendo
            </h3>
            { generateCourses() }
          </>
        )}
      </div>
      <div className="student-details-buttons dark-purple-text">
        <Link
          className="lined-button"
          to={`/users/${props.currentFaculty.id}/edit`}
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
