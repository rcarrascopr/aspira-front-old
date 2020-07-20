import React from "react";

import EventsShow from "./EventsShow";
import SemesterShow from "./SemesterShow";
import EventForm from "./form/EventForm";

export default function EventSemesterDetails(props) {
  const generateEventCardContent = () => {
    if (props.cardContent == "") {
      return (
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h2 style={{ color: "#AAA" }}>
            Selecciona un{" "}
            {props.activeTab === "Eventos próximos" ||
            props.activeTab === "Eventos"
              ? "evento"
              : "semestre"}
          </h2>
        </div>
      );
    } else {
      if (
        props.activeTab === "Eventos próximos" ||
        props.activeTab === "Eventos"
      ) {
        if (props.cardContent == "create") {
          return <EventForm center_id={props.currentCenter} />;
        } else if (props.cardContent == "edit") {
          return (
            <EventForm
              event={props.currentEvent}
              center_id={props.currentCenter}
            />
          );
        } else if (props.cardContent == "show") {
          return <EventsShow event={props.currentEvent} />;
        }
      } else {
        if (props.cardContent == "create") {
        } else if (props.cardContent == "edit") {
        } else if (props.cardContent == "show") {
        }
      }
    }
  };
  return <div className="event-card">{generateEventCardContent()}</div>;
}
