import React from "react";

export default function SemesterShow(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.setCardContent("edit");
  };
  return (
    <section className="events-show">
      <h2>{props.semester.name}</h2>
      <p>{props.semester.start_date}</p>
      <p>{props.semester.end_date}</p>
      <a className="primary-btn" onClick={handleClick}>
        Editar Semestre
      </a>
    </section>
  );
}
