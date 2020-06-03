import React from "react";

import { NameCircle } from "../../commons/NameCircle";

export default function StudentDetails(props) {
  return (
    <div className="white student-details-container">
      <div className="student-profile-details dark-purple-text">
        <NameCircle size="huge" initials="KY"/>
        <ul>
          <p>Nombre Apellido Apellido</p>
          <li>emailgoeshere@here.com</li>
          <li>000-000-0000</li>
          <li>ashvgbfchvbsck</li>
          <li>ashvgbfchvbsck bafkjbkf</li>
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
