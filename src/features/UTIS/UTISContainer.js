import React, { useState, useEffect } from "react";
import "./UTIS.css";
import { connect } from "react-redux";

import { LoadingScreen } from "../../commons/LoadingScreen";
import { SelectInput } from "../../commons/inputs/SelectInput";
import { ButtonGroup } from "./ButtonGroup";
import CoursesContainer from "./CoursesContainer";

import { grade_ascending, grade_descending } from "../../commons/sort_methods";

import { fetchCenters } from "../../actions/centerActions";

const UTISContainer = ({ centers }) => {
  const [buttonStates, setButtonStates] = useState({
    "socio-humanístico": true,
    "científico-técnico": true,
    ocupacional: true,
    cultural: true,
    comunitaria: true,
  });

  const [sortBy, setSortBy] = useState("Grado - (ascendiente ↑)");
  const [currentCenter, setCurrentCenter] = useState("");
  const [courses, setCourses] = useState("");

  const handleChange = (event) => {
    const selectedCenter = centers.find((c) => c.id === event.target.value);
    console.log("Center selected: ", selectedCenter);
    setCurrentCenter(selectedCenter);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    fetchCenters();
  }, [centers]);

  useEffect(() => {
    //Set sorting method
    let sort_method;
    if (sortBy === "Grado - (ascendiente ↑)") {
      sort_method = grade_ascending;
    } else if (sortBy === "Grado - (descendiente ↓)") {
      sort_method = grade_descending;
    }
    //get courses from selected center
    setCourses(currentCenter.courses);
  }, [buttonStates, currentCenter.courses, sortBy]);

  const handleClick = (event) => {
    setButtonStates({
      ...buttonStates,
      [event.target.name]: !buttonStates[event.target.name],
    });
  };

  const renderCourses = () => {
    if (!!courses) {
      return <CoursesContainer courses={courses} setCourses={setCourses} />;
    } else {
      return <h2>Por favor seleccione un centro.</h2>;
    }
  };

  return (
    <section className="utis-container courses-purple">
      <div className="utis-filters">
        <SelectInput
          name="center"
          label="Centro"
          invert={true}
          labelWidth={50}
          items={centers}
          handleChange={handleChange}
          value={centers[0]}
        />
        <SelectInput
          name="sortBy"
          label="Ordenar por"
          invert={true}
          value={sortBy}
          labelWidth={90}
          items={["Grado - (ascendiente ↑)", "Grado - (descendiente ↓)"]}
          handleChange={handleSortChange}
        />
      </div>

      <ButtonGroup buttonStates={buttonStates} handleClick={handleClick} />
      <hr />

      {renderCourses()}
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    centers: state.centers.centers,
  };
};

let mapDispatchToProps = (dispatch) => ({
  fetchCenters: dispatch(fetchCenters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UTISContainer);
