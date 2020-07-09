import React, { useState, useEffect } from "react";

import { FacultyList } from "./FacultyList";
import FacultyDetails from "./FacultyDetails";
import { LoadingScreen } from "../../commons/LoadingScreen";

import { fetchFacultyUsers, fetchFacultyUser } from "../../actions/facultyActions";

import { connect } from "react-redux";

// import "./students.css";

const FacultyContainer = (props) => {
  const [formData, setFormData] = useState({
    center: "Todos",
    sortBy: "Nombre",
    title: "Todos",
    filter: "",
  });

  const [currentFaculty, setCurrentFaculty] = useState();

  useEffect(() => {
    props.fetchFacultyUsers();
  }, []);

  useEffect(() => {
    if (currentFaculty && currentFaculty.id) {
      props.fetchFacultyUser(currentFaculty.role, currentFaculty.id);
    }
  }, [currentFaculty]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (props.faculty.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <section className="students-container">
      <FacultyList
        faculty={props.faculty}
        formData={formData}
        handleChange={handleChange}
        setCurrentFaculty={setCurrentFaculty}
      />
      <FacultyDetails currentFaculty={props.currentFaculty} />
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    faculty: state.faculty.faculty,
    currentFaculty: state.faculty.currentFaculty,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchFacultyUsers: () => dispatch(fetchFacultyUsers()),
    fetchFacultyUser: (role, id) => dispatch(fetchFacultyUser(role, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacultyContainer);
