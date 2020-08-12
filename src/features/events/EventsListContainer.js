import React, { useState } from "react";

import * as moment from "moment";

import EventsList from "./EventsList";
import SemesterList from "./semesters/SemestersList";

export default function EventsListContainer(props) {
  const tabs =
    props.currentUser && props.currentUser.role === "Admin"
      ? ["Eventos próximos", "Eventos", "Año escolar"]
      : ["Eventos próximos", "Eventos"];

  const generateTabs = () => {
    return tabs.map((tab) => (
      <li
        className={`events-tab ${
          props.activeTab === tab ? "active-events-tab" : ""
        }`}
        onClick={(event) => props.setActiveTab(tab)}
      >
        {tab}
      </li>
    ));
  };

  function on2Weeks(date) {
    let differenceInDays = moment(date).diff(moment(), "days");

    return differenceInDays >= 0 && differenceInDays <= 13;
  }

  const generateItems = () => {
    if (props.activeTab === "Año escolar") {
      return (
        <SemesterList
          semesters={props.semesters}
          currentSemester={props.currentSemester}
          setCurrentSemester={props.setCurrentSemester}
        />
      );
    } else {
      let sortedEvents = props.events.sort((a, b) =>
        ("" + b.date).localeCompare(a.date)
      );
      if (props.activeTab === "Eventos próximos") {
        return (
          <EventsList
            events={sortedEvents.filter((event) => on2Weeks(event.date))}
            setCurrentEvent={props.setCurrentEvent}
            currentEvent={props.currentEvent}
          />
        );
      } else {
        return (
          <EventsList
            events={sortedEvents}
            setCurrentEvent={props.setCurrentEvent}
            currentEvent={props.currentEvent}
          />
        );
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.setCurrentEvent({});
    props.setCurrentSemester({});
    props.setCardContent("create");
  };

  return (
    <div className="events-list-container">
      <ul className="events-tabs-container">{generateTabs()}</ul>
      {generateItems()}
      {props.currentUser && props.currentUser.role === "Admin" && (
        <a className="secondary-btn-outline" onClick={handleClick}>
          Crear {props.activeTab === "Año escolar" ? "Semestre" : "evento"}
        </a>
      )}
    </div>
  );
}
