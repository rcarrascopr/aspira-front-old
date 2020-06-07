import React from "react";

export default function EventsCircle(props) {
  return <div className={`event-circle event-circle-${props.category}`}></div>;
}
