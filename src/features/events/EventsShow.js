import React from "react";

import generateDate from "../../commons/dateParser";

export default function EventsShow(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.setCardContent("edit");
  };

  if (props.event && props.event.center) {
    return (
      <section className="events-show">
        <div>
          <h2 className="dark-purple-text">{generateDate()}</h2>

          <p className="dark-purple-text event-name">{props.event.name}</p>
        </div>

        <p className="dark-purple-text event-text">{props.event.description}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p className="dark-purple-text event-text">
            Categoría: <strong>{props.event.category}</strong>
          </p>
          <p className="dark-purple-text event-text">
            Centro: {props.event.center.name}
          </p>
          <a
            className="primary-btn-outline dark-purple-text font-weight-normal event-text"
            onClick={handleClick}
          >
            Editar
          </a>
        </div>
      </section>
    );
  } else {
    return <></>;
  }
}
