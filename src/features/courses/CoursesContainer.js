import React, { useState, useEffect } from "react";

import CourseCard from "./CourseCard";
import NoResultsLottie from "../../commons/no results/NoResultsLottie";
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
    if (courses && courses.length > 0) {
      return courses.slice(0, 15).map((course) => <CourseCard {...course} />);
    } else {
      return (
        <div>
          <NoResultsLottie />
          <p className="dark-purple-text text-align-center ">
            No hay cursos en este semestre
          </p>
        </div>
      );
    }
  };
  return (
    <section className="courses-container">
      <h1 className="dark-purple-text">Cursos</h1>

      <div className="card-group" style={{ alignItems: "center" }}>
        {props.currentUser.role === "Admin" && (
          <div
            className="course-card dark-purple white-text pointer"
            onClick={handleClick}
          >
            <div className="course-card-create">
              <p className="plus-icon">+</p>
              <h2>Crear nuevo curso</h2>
            </div>
          </div>
        )}
        {generateCards()}
      </div>

      {courses && courses.length > 0 && (
        <Pagination
          items={props.courses}
          setItems={setCourses}
          itemsByPage={15}
        />
      )}
    </section>
  );
};

export default withRouter(CoursesContainer);
