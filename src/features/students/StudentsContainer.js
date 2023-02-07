import React, { useState, useEffect } from "react";

import { StudentList } from "./StudentList";
import StudentDetails from "./StudentDetails";
import { LoadingScreen } from "../../commons/loading/LoadingScreen";

import { fetchStudents, fetchStudent } from "../../actions/studentActions";
import { fetchFacultyUsers } from "../../actions/facultyActions";
import { fetchCourses } from "../../actions/courseActions";

import { connect } from "react-redux";

import "./students.css";

const StudentsContainer = (props) => {
  const [formData, setFormData] = useState({
    center: "Todos",
    // sortBy: "Nombre",
    teacher: "Todos",
    course: "Todos",
    grade: "Todos",
    active: "Activos",
    filter: "",
  });

  const [currentStudent, setCurrentStudent] = useState();

  useEffect(() => {
    if (props.students.length === 0) {
      props.fetchStudents();
    }
    if (props.faculty.length === 0) {
      props.fetchFacultyUsers()
    }
    if (props.courses.length === 0) {
      props.fetchCourses();
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
        teachers={props.faculty.filter((f) => f.courses.length > 0)}
        courses={props.courses.filter(
          (course) =>
            props.currentSelectedSemester &&
            props.currentSelectedSemester.id === course.semester_id
        )}
        formData={formData}
        handleChange={handleChange}
        setCurrentStudent={setCurrentStudent}
        
      />
      <StudentDetails 
        currentStudent={props.currentStudent} 
        currentSelectedSemester={props.currentSelectedSemester}
      />
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    students: state.students.students,
    currentStudent: state.students.currentStudent,
    faculty: state.faculty.faculty,
    courses: state.courses.courses,
    currentSelectedSemester: state.semesters.currentSelectedSemester,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: () => dispatch(fetchStudents()),
    fetchStudent: (id) => dispatch(fetchStudent(id)),
    fetchFacultyUsers: () => dispatch(fetchFacultyUsers()),
    fetchCourses: () => dispatch(fetchCourses()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentsContainer);
