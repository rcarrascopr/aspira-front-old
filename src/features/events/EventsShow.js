import React from "react";

export default function EventsShow(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.setCardContent("edit");
  };
  return (
    <section className="events-show">
      <h2 className="dark-purple-text">{props.event.date}</h2>
    
      <p className="dark-purple-text">{props.event.name}</p>
      <p className="dark-purple-text">{props.event.description}</p>
      <p className="dark-purple-text">
        Categoría: <strong>{props.event.category}</strong>
      </p>
      <p className="dark-purple-text">Centro: {props.event.center.name}</p>
      <a className="primary-btn" onClick={handleClick}>
        Editar Evento
      </a>
    </section>
  );
}
