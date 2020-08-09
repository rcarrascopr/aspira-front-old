import React, { useEffect } from "react";

import UTISList from "./plans/UTISList";

import { connect } from "react-redux";

import { fetchOneCourse } from "../../../actions/courseActions";

import "./coursesShowContainer.css";

// const utis = [
//   { name: "UTIS 1", products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
//   { name: "UTIS 2", products: [1, 2, 3, 4, 5] },
//   { name: "UTIS 3", products: [1, 2, 3] },
//   { name: "UTIS 4", products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
//   { name: "UTIS 5", products: [1] },
//   { name: "UTIS 6", products: [1, 2, 3] },
// ];

function CoursesShowContainer(props) {
  useEffect(() => {
    props.fetchCourse(props.match.params.id);
  }, []);

  return (
    <section className="courses-show-container courses-purple">
      <h1
        className="dark-purple-text"
        style={{ display: "flex", justifyContent: "center" }}
      >
        UTIS del curso: {props.currentCourse ? props.currentCourse.name : ""}
      </h1>

      <hr />

      <UTISList />
    </section>
  );
}

let mapStateToProps = (state) => {
  return { currentCourse: state.courses.currentCourse };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: (courseId) => dispatch(fetchOneCourse(courseId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesShowContainer);
