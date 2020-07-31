import React from "react";

import Event from "./Event";

export default function EventsList(props) {
  const generateEvents = () => {
    return props.events.map((event) => {
      return (
        <Event event={event} setCurrentEvent={props.setCurrentEvent} />
      );
    });
  };
  return <ul className="events-list scrollable">{generateEvents()}</ul>;
}
