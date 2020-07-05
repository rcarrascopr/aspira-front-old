import React, { useState, useEffect } from "react";

import { StudentList } from "./StudentList";
import StudentDetails from "./StudentDetails";
import { LoadingScreen } from "../../commons/LoadingScreen";

import { fetchStudents } from "../../actions/studentActions";

import { connect } from "react-redux";

import "./students.css";

const StudentsContainer = (props) => {
  const [formData, setFormData] = useState({
    center: "",
    sortBy: "Nombre",
    grade: "",
    filter: "",
  });

  const [currentStudent, setCurrentStudent] = useState();

  useEffect(() => {
    props.fetchStudents();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (props.students.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <section className="students-container">
      <StudentList
        students={props.students}
        formData={formData}
        handleChange={handleChange}
        setCurrentStudent={setCurrentStudent}
      />
      <StudentDetails />
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    students: state.students.students,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: () => dispatch(fetchStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsContainer);
