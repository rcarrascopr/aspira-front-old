import React, { useState, useEffect } from "react";
import "./UTIS.css";
import { connect } from "react-redux";

import { LoadingScreen } from "../../commons/LoadingScreen";
import { SelectInput } from "../../commons/inputs/SelectInput";
import { ButtonGroup } from "./ButtonGroup";
import CoursesContainer from "./CoursesContainer";

import { grade_ascending, grade_descending } from "../../commons/sort_methods";

import { fetchCourses } from "../../actions/utisActions";

const UTISContainer = (props) => {
  const [buttonStates, setButtonStates] = useState({
    "socio-humanístico": true,
    "científico-técnico": true,
    ocupacional: true,
    cultural: true,
    comunitaria: true,
  });

  const [courses, setCourses] = useState([]);
  const [sortBy, setSortBy] = useState("Grado - (ascendiente ↑)");
  const [center, setCenter] = useState();

  const handleChange = (event) => {
    setCenter(
      props.centers.find((center) => center.name === event.target.value)
    );
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    if (props.centers.length > 0) {
      setCenter(props.centers[0]);
    }
  }, [props.centers]);

  useEffect(() => {
    props.getCourses();
  }, []);

  useEffect(() => {
    let sort_method;
    if (sortBy === "Grado - (ascendiente ↑)") {
      sort_method = grade_ascending;
    } else if (sortBy === "Grado - (descendiente ↓)") {
      sort_method = grade_descending;
    }

    console.log(sort_method);
    setCourses(
      props.courses
        .filter((course) => buttonStates[course.category.toLowerCase()])
        .sort(sort_method)
    );
  }, [buttonStates, props.courses, sortBy]);

  const handleClick = (event) => {
    setButtonStates({
      ...buttonStates,
      [event.target.name]: !buttonStates[event.target.name],
    });
  };

  if (!center) {
    return <LoadingScreen content="Loading" />;
  }

  return (
    <section className="utis-container courses-purple">
      <div className="utis-filters">
        <SelectInput
          name="center"
          label="Centro"
          invert={true}
          value={center.name}
          labelWidth={50}
          items={props.centers}
          handleChange={handleChange}
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

      <CoursesContainer courses={courses} setCourses={setCourses} />
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    centers: state.centers.centers,
    courses: state.utis.courses,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getCourses: () => dispatch(fetchCourses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UTISContainer);
