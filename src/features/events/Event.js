import React from "react";

import generateDate from "../../commons/dateParser";

import EventsCircle from "../../commons/EventsCircle";

export default function Event(props) {
  return (
    <li
      className={`event-item ${
        props.currentEvent && props.currentEvent.id === props.event.id
          ? "event-item-selected"
          : ""
      }`}
      onClick={() => props.setCurrentEvent(props.event)}
    >
      <EventsCircle category={props.event.category} />
      <div className="event-item-content">
        <p className="event-date">{generateDate(props.event.date)}</p>
        <p className="event-name">{props.event.name}</p>
      </div>
    </li>
  );
}
