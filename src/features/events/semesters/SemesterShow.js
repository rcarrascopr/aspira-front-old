import React from "react";

import generateDate from "../../../commons/dateParser";

export default function SemesterShow(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.setCardContent("edit");
  };
  return (
    <section className="events-show">
      <h2 className="dark-purple-text">{props.semester.name}</h2>
      <p className="dark-purple-text event-text">
        Fecha de inicio: {generateDate(props.semester.start_date)}
      </p>
      <p className="dark-purple-text event-text">
        Fecha de cierre: {generateDate(props.semester.end_date)}
      </p>
      <a
        className="primary-btn-outline dark-purple-text font-weight-normal event-text"
        onClick={handleClick}
      >
        Editar Semestre
      </a>
    </section>
  );
}
