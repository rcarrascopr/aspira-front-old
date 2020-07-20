import React, { useState } from "react";

import Event from "./Event";


export default function EventsListContainer(props) {
  const tabs = ["Eventos próximos", "Eventos", "Año escolar"];

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

  const generateEvents = () => {
    return props.events.map((event) => {
      return <Event event={event} />;
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    props.setCurrentEvent({});
    props.setCardContent("create");
  };

  return (
    <div className="events-list-container">
      <ul className="events-tabs-container">{generateTabs()}</ul>
      <ul className="events-list">{generateEvents()}</ul>
      <a className="secondary-btn-outline" onClick={handleClick}>
        Crear Evento
      </a>
    </div>
  );
}
