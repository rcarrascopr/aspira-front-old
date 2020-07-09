import React from "react";

import { NameCircle } from "../../commons/NameCircle";

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
          <li>{props.currentFaculty.email}</li>
          <li>{props.currentFaculty.residence_municipality}</li>
          <li>{props.currentFaculty.role}</li>
          <li>{props.currentFaculty.center_name}</li>
        </ul>
      </div>
      <div className="student-courses-details">
        {props.currentFaculty.courses && (
          <>
            <h3 className="dark-purple-text student-details-header">
              UTI que está ofreciendo
            </h3>
            <CoursesListContainer items={props.currentFaculty.courses} />
          </>
        )}
      </div>
      <div className="student-details-buttons dark-purple-text">
        <a className="lined-button">Editar</a>
        <a className="lined-button">
          <img src="/assets/trash_icon.png" alt="" />
        </a>
      </div>
    </div>
  );
}
