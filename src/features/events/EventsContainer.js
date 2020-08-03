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
  const [currentCenter, setCurrentCenter] = useState(centers[0].id);
  const [activeTab, setActiveTab] = useState("Eventos próximos");
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentSemester, setCurrentSemester] = useState({});
  const [cardContent, setCardContent] = useState("");

  useEffect(() => {
    props.fetchEvents();
    if (props.semesters.length === 0) {
      props.fetchSemesters();
    }
  }, []);

  useEffect(() => {
    if (!(cardContent == "show" || cardContent == "edit")) {
      // if (currentEvent.id) {
      setCurrentEvent({});
      // }
      // if (currentSemester.id) {
      setCurrentSemester({});
      // }
    }
  }, [activeTab, currentCenter, cardContent]);

  useEffect(() => {
    if (!!(currentEvent.name || currentSemester.name)) {
      setCardContent("show");
    }
  }, [currentEvent, currentSemester]);

  useEffect(() => {
    setCardContent("");
  }, [activeTab]);

  const handleChange = (event) => {
    setCurrentCenter(event.target.value);
  };

  return (
    <section className="events-container">
      <EventsListContainer
        events={
          currentCenter && currentCenter !== "Todos"
            ? props.events.filter((event) => event.center.id === currentCenter)
            : props.events
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
        setCardContent={setCardContent}
        currentCenter={currentCenter}
        semesters={props.semesters}
        setCurrentSemester={setCurrentSemester}
      />
      <section className="event-semester-details">
        <div className={activeTab != "Año escolar" ? "" : "hidden"}>
          <SelectInput
            name="center"
            label="Centro"
            value={currentCenter}
            labelWidth={50}
            // items={["Todos", ...centers]}
            items={centers}
            handleChange={handleChange}
          />
        </div>

        <EventSemesterDetails
          activeTab={activeTab}
          cardContent={cardContent}
          setCardContent={setCardContent}
          currentCenter={currentCenter}
          currentEvent={currentEvent}
          semesters={props.semesters}
          currentSemester={currentSemester}
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
