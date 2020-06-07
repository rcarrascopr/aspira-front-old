import React, { useState } from "react";

import EventsListContainer from "./EventsListContainer";
import EventsShow from "./EventsShow";
import SemesterShow from "./SemesterShow";

import "./EventsContainer.css";

const events = [
  {
    id: 1,
    name: "Receso navideño",
    category: "general",
    description: "Empezamos la navidad.",
    date: "27 de Febrero de 2020",
  },
  {
    id: 2,
    name: "Semana de la puertorriqueñidad",
    category: "faculty",
    description: "Celebramos nuestras raices.",
    date: "27 de Febrero de 2020",
  },
  {
    id: 3,
    name: "Dia de la amistad",
    category: "administration",
    description: "Celebramos la amistad. Feriado.",
    date: "27 de Febrero de 2020",
  },
  {
    id: 4,
    name: "Semana de acción de gracia",
    category: "general",
    description: "Damos las gracias por lo que tenemos.",
    date: "27 de Febrero de 2020",
  },
];

export default function EventsContainer() {
  const [activeTab, setActiveTab] = useState("Eventos próximos");

  return (
    <section className="events-container">
      <EventsListContainer
        events={events}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <EventsShow event={{}} />

     
    </section>
  );
}
