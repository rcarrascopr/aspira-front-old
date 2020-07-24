import React, { useState, useEffect } from "react";

import EventsListContainer from "./EventsListContainer";
import EventSemesterDetails from "./EventSemesterDetails";

import { SelectInput } from "../../commons/inputs/SelectInput";

import { connect } from "react-redux";

import centers from "../../commons/data/centers";
import events from "../../commons/data/events";

import "./EventsContainer.css";

import { fetchEvents } from "../../actions/eventActions";
import { fetchSemesters } from "../../actions/semesterActions";

function EventsContainer(props) {
  const [currentCenter, setCurrentCenter] = useState(events[0].id);
  const [activeTab, setActiveTab] = useState("Eventos próximos");
  const [currentEvent, setCurrentEvent] = useState({});
  const [cardContent, setCardContent] = useState("");

  useEffect(() => {
    props.fetchEvents();
    if (props.semesters.length === 0) {
      props.fetchSemesters();
    }
  }, []);

  useEffect(() => {
    if (!(cardContent == "show" || cardContent == "edit")) {
      setCurrentEvent({});
    }
  }, [activeTab, currentCenter, cardContent]);

  useEffect(() => {
    if (currentEvent.name) {
      setCardContent("show");
    }
  }, [currentEvent]);

  const handleChange = (event) => {
    setCurrentCenter(event.target.value);
  };

  return (
    <section className="events-container">
      <EventsListContainer
        events={props.events}
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
          setCardContent={setCardContent}
          currentCenter={currentCenter}
          currentEvent={currentEvent}
          semesters={props.semesters}
        />
      </section>
    </section>
  );
}

let mapStateToProps = (state) => {
  return { events: state.events.events, semesters: state.semesters.semesters };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchSemesters: () => dispatch(fetchSemesters()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
