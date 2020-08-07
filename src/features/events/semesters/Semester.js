import React from "react";

import { NameCircle } from "../../../commons/NameCircle";

export default function Semester(props) {
  let semester = props.semester.name ? props.semester.name.split("") : [];
  return (
    <li
      className={`event-item ${
        props.currentSemester &&
        props.currentSemester.id === props.semester.id
          ? "event-item-selected"
          : ""
      }`}
      onClick={() => props.setCurrentSemester(props.semester)}
    >
      <NameCircle
        initials={"S" + semester[semester.length - 1]}
        size={"medium"}
      />
      <div className="event-item-content">
        <p className="event-date">Año Escolar {props.semester.name}</p>
        <p className="event-name">Semestre {semester[semester.length - 1]}</p>
      </div>
    </li>
  );
}
