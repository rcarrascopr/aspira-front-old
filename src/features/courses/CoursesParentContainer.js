import React, { useState, useEffect } from "react";
import "./Courses.css";
import { connect } from "react-redux";

import { SelectInput } from "../../commons/inputs/SelectInput";
import { ButtonGroup } from "./ButtonGroup";
import CoursesContainer from "./CoursesContainer";

import { grade_ascending, grade_descending } from "../../commons/sort_methods";

import { fetchCenters } from "../../actions/centerActions";
import { fetchCourses } from "../../actions/courseActions";

const CoursesParentContainer = (props) => {
  const [buttonStates, setButtonStates] = useState({
    "socio-humanístico": true,
    "científico-técnico": true,
    ocupacional: true,
    cultural: true,
    comunitaria: true,
  });

  const [sortBy, setSortBy] = useState("Grado - (ascendiente ↑)");
  const [currentCenter, setCurrentCenter] = useState("Todos");
  const [courses, setCourses] = useState([]);

  const handleChange = (event) => {
    let selectedCenter;
    if (event.target.value === "Todos") {
      selectedCenter = "Todos";
    } else {
      selectedCenter = props.centers.find((c) => c.id === event.target.value);
    }

    // console.log("Center selected: ", selectedCenter);
    setCurrentCenter(selectedCenter);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    if (props.currentUser.role === "Admin" && props.centers.length === 0) {
      props.fetchCenters();
    } else if (props.courses.length === 0) {
      props.fetchCourses();
    }
  }, []);

  useEffect(() => {
    const selectedCenter = props.centers.find(
      (c) => c.name === props.currentUser.center_name
    );
    // console.log("Center selected: ", selectedCenter);
    setCurrentCenter(selectedCenter);
  }, [props.centers]);

  useEffect(() => {
    //Set sorting method
    let sort_method;
    if (sortBy === "Grado - (ascendiente ↑)") {
      sort_method = grade_ascending;
    } else if (sortBy === "Grado - (descendiente ↓)") {
      sort_method = grade_descending;
    }
    //get courses from selected center
    if (currentCenter) {
      let centerCourses = [];
      if (currentCenter === "Todos") {
        for (let i = 0; i < props.centers.length; i++) {
          centerCourses = [
            ...centerCourses,
            ...props.centers[i].courses
              .filter((course) => buttonStates[course.category.toLowerCase()])
              .map((course) => {
                return { ...course, center_name: props.centers[i].name };
              }),
          ];
        }
        setCourses(centerCourses.sort(sort_method));
      } else {
        centerCourses = currentCenter.courses.filter(
          (course) => buttonStates[course.category.toLowerCase()]
        );
      }

      if (props.currentUser.role === "Admin") {
        setCourses(centerCourses.sort(sort_method));
      } else if (props.currentUser.role === "Teacher") {
        setCourses(
          centerCourses
            .filter((course) => course.teacher.id === props.currentUser.id)
            .sort(sort_method)
        );
      }
    }
  }, [buttonStates, sortBy, currentCenter]);

  const handleClick = (event) => {
    setButtonStates({
      ...buttonStates,
      [event.target.name]: !buttonStates[event.target.name],
    });
  };

  const renderCourses = () => {
    if (currentCenter || props.courses.length > 0) {
      return (
        <CoursesContainer
          courses={props.currentUser.role === "Admin" ? courses : props.courses}
          setCourses={setCourses}
          currentUser={props.currentUser}
        />
      );
    } else if (props.currentUser.role === "Admin") {
      return (
        <h2 className="dark-purple-text courses-header">
          Por favor seleccione un centro.
        </h2>
      );
    } else {
      return (
        <h2 className="dark-purple-text courses-header">
          No tienes cursos asignados.
        </h2>
      );
    }
  };

  return (
    <section className="utis-container courses-purple">
      {props.currentUser.role === "Admin" && (
        <>
          <div className="utis-filters">
            <SelectInput
              name="center"
              label="Centro"
              invert={true}
              labelWidth={50}
              items={["Todos", ...props.centers]}
              handleChange={handleChange}
              value={
                currentCenter && currentCenter.id
                  ? currentCenter.id
                  : currentCenter
              }
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
        </>
      )}

      {renderCourses()}
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    centers: state.centers.centers,
    currentUser: state.users.currentUser,
    courses: state.courses.courses,
  };
};

let mapDispatchToProps = (dispatch) => ({
  fetchCenters: () => dispatch(fetchCenters()),
  fetchCourses: () => dispatch(fetchCourses()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesParentContainer);
