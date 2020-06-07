import React from "react";

import EventsCircle from "../../commons/EventsCircle";

export default function Event(props) {
  return (
    <li className="event-item">
      <EventsCircle category={props.event.category} />
      <div className="event-item-content">
        <p className="event-date">{props.event.date}</p>
        <p className="event-name">{props.event.name}</p>
      </div>
    </li>
  );
}
