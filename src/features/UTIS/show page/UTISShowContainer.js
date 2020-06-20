import React, { useEffect } from "react";
import { connect } from "react-redux";
import CourseContext from "../../../contexts/CourseContext";

import ProductListContainer from "./ProductListContainer";
import StudentListCard from "./StudentListCard";
import StudentsRegisteredCard from "./StudentsRegistedCard";

import { fetchOneCourse } from "../../../actions/utisActions";

import "./UTISShowContainer.css";

export function UTISShowContainer(props) {
  const { course, fetchOneCourse } = props;
  const utisId = props.match.params.id;
  console.log("Hit UTIS Show Container!");

  useEffect(() => {
    if (utisId !== course.id) {
      fetchOneCourse(utisId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utisId]);

  return (
    <CourseContext.Provider value={course}>
      <section className="utis-show-container">
        <ProductListContainer />
        <div className="course-card-wrapper">
          <StudentsRegisteredCard />
          <StudentListCard />
        </div>
      </section>
    </CourseContext.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    course: state.utis.currentCourse,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOneCourse: (courseId) => dispatch(fetchOneCourse(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UTISShowContainer);
