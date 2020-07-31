import React from "react";

import EventsShow from "./EventsShow";
import SemesterShow from "./semesters/SemesterShow";
import SemesterForm from "./semesters/form/SemesterForm";
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
          return <EventForm event={{}} center_id={props.currentCenter} />;
        } else if (props.cardContent == "edit") {
          return (
            <EventForm
              event={props.currentEvent}
              center_id={props.currentCenter}
            />
          );
        } else if (props.cardContent == "show") {
          return (
            <EventsShow
              event={props.currentEvent}
              setCardContent={props.setCardContent}
            />
          );
        }
      } else {
        if (props.cardContent == "create") {
          return <SemesterForm semester={{}} />;
        } else if (props.cardContent == "edit") {
          return <SemesterForm semester={props.currentSemester} />;
        } else if (props.cardContent == "show") {
          return (
            <SemesterShow
              semester={props.currentSemester}
              setCardContent={props.setCardContent}
            />
          );
        }
      }
    }
  };
  return <div className="event-card">{generateEventCardContent()}</div>;
}
