import React from "react";

import { NameCircle } from "../../commons/NameCircle";

export default function StudentDetails(props) {
  if (!(props.currentStudent && props.currentStudent.id)) {
    return <div className="white student-details-container" style={{display: "flex", 'justifyContent': "center", 'alignItems': 'center'}}>
      <h2 style={{color: '#AAA'}}>Selecciona un estudiante</h2>
    </div>
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
          <p>{`${props.currentStudent.first_name} ${props.currentStudent.paternal_surname} ${props.currentStudent.maternal_surname}`}</p>
        <li>{props.currentStudent.email}</li>
          <li>{props.currentStudent.phone_number}</li>
        <li>{props.currentStudent.badge_id}</li>
        <li>Grade: {props.currentStudent.academic_level}</li>
        </ul>
      </div>
      <div className="student-courses-details"></div>
      <div className="student-details-buttons dark-purple-text">
        <a className="lined-button">Generar Reporte</a>
        <a className="lined-button">Editar</a>
        <a className="lined-button">
          <img src="/assets/trash_icon.png" alt="" />
        </a>
      </div>
    </div>
  );
}
