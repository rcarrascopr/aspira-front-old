import React, { useState } from "react";

import Event from "./Event";

export default function EventsListContainer(props) {
  const tabs = ["Eventos próximos", "Eventos", "Año escolar"];

  const handleClick = (event) => {};

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

  return (
    <div className="events-list-container">
      <ul className="events-tabs-container">{generateTabs()}</ul>
      <ul className="events-list">{generateEvents()}</ul>
      <a className="secondary-btn-outline">Crear Evento</a>
    </div>
  );
}
