import React, { useState, useEffect } from "react";

import CourseCard from "./CourseCard";
import { Pagination } from "../../commons/pagination/Pagination";

import { withRouter } from "react-router-dom";

const CoursesContainer = (props) => {
  const [courses, setCourses] = useState("");

  useEffect(() => {
    setCourses(props.courses);
  }, [props.courses]);

  const handleClick = () => {
    props.history.push("/cursos/create");
  };

  const generateCards = () => {
    if (!!courses) {
      return courses.slice(0, 15).map((course) => <CourseCard {...course} />);
    }
  };
  return (
    <section className="courses-container">
      <h1>Cursos</h1>

      <div className="card-group">
        <div
          className="course-card dark-purple white-text"
          onClick={handleClick}
        >
          <div className="course-card-create">
            <p className="plus-icon">+</p>
            <h2>Crear nuevo curso</h2>
          </div>
        </div>
        {generateCards()}
      </div>

      <Pagination
        items={props.courses}
        setItems={setCourses}
        itemsByPage={15}
      />
    </section>
  );
};

export default withRouter(CoursesContainer);
