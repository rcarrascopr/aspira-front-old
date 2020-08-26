import React, { useState, useEffect } from "react";

import { StudentList } from "./StudentList";
import StudentDetails from "./StudentDetails";
import { LoadingScreen } from "../../commons/loading/LoadingScreen";

import { fetchStudents, fetchStudent } from "../../actions/studentActions";

import { connect } from "react-redux";

import "./students.css";

const StudentsContainer = (props) => {
  const [formData, setFormData] = useState({
    center: "Todos",
    sortBy: "Nombre",
    grade: "Todos",
    filter: "",
  });

  const [currentStudent, setCurrentStudent] = useState();

  useEffect(() => {
    if (props.students.length === 0) {
      props.fetchStudents();
    }
  }, []);

  useEffect(() => {
    if (currentStudent && currentStudent.id) {
      props.fetchStudent(currentStudent.id);
    }
  }, [currentStudent]);

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
      <StudentDetails currentStudent={props.currentStudent} />
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    students: state.students.students,
    currentStudent: state.students.currentStudent,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: () => dispatch(fetchStudents()),
    fetchStudent: (id) => dispatch(fetchStudent(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsContainer);
