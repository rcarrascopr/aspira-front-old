import React from "react";

export default function EventsShow(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.setCardContent("edit");
  };
  return (
    <section className="events-show">
      <h2>{props.event.date}</h2>
      <p>{props.event.name}</p>
      <p>{props.event.description}</p>
      <p>
        Categoría: <strong>{props.event.category}</strong>
      </p>
      <a className="primary-btn" onClick={handleClick}>
        Editar Evento
      </a>
    </section>
  );
}
