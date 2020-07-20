import React, { useState } from "react";

import EventsListContainer from "./EventsListContainer";
import EventSemesterDetails from "./EventSemesterDetails";

import { SelectInput } from "../../commons/inputs/SelectInput";

import centers from "../../commons/data/centers";

import "./EventsContainer.css";

import events from "../../commons/data/events";

export default function EventsContainer() {
  const [currentCenter, setCurrentCenter] = useState(events[0].id);
  const [activeTab, setActiveTab] = useState("Eventos próximos");
  const [currentEvent, setCurrentEvent] = useState({});
  const [cardContent, setCardContent] = useState("");

  const handleChange = (event) => {
    setCurrentCenter(event.target.value);
  };

  return (
    <section className="events-container">
      <EventsListContainer
        events={events}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        setCardContent={setCardContent}
        currentCenter={currentCenter}
      />
      <section className="event-semester-details">
        <SelectInput
          name="center"
          label="Centro"
          value={currentCenter}
          labelWidth={50}
          items={centers}
          handleChange={handleChange}
        />
        <EventSemesterDetails
          activeTab={activeTab}
          cardContent={cardContent}
          currentCenter={currentCenter}
        />
      </section>
    </section>
  );
}
