import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm, FormContext } from "react-hook-form";
import { Paper } from "@material-ui/core";
import { Details } from "./Details";
import { Students } from "./Students";

import {
  fetchCenters,
  fetchStudentsFromCenter,
} from "../../../actions/centerActions";
// import { fetchTeachers } from "../../../actions/userActions";
import {
  fetchFacultyUsers,
} from "../../../actions/facultyActions";
import { fetchSemesters } from "../../../actions/semesterActions";
import {
  setCoursesFormData,
  createCourse,
  fetchOneCourse,
  editCourse,
  resetCoursesFormData,
} from "../../../actions/courseActions";

import "./CoursesForm.css";
import "../../products/form/ProductFormContainer.css";

const CoursesFormContainer = (props) => {
  const {
    centers,
    centerWithStudents,
    semesters,
    // teachers,
    faculty,
    coursesFormData,
    setcoursesFormData,
    fetchCenters,
    fetchSemesters,
    fetchFaculty,
    fetchStudentsFromCenter,
    createCourse,
  } = props;

  const { control, errors, reset, handleSubmit, getValues } = useForm({
    defaultValues: coursesFormData,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const students = centerWithStudents ? centerWithStudents.students : [];

  const contextObjects = {
    control,
    errors,
    reset,
    centers,
    centerWithStudents,
    students,
    semesters,
    faculty,
    selectedStudents,
    setSelectedStudents,
    coursesFormData,
    setCoursesFormData,
  };

  //fetch centers after mounted
  useEffect(() => {
    fetchCenters();
    fetchSemesters();
    fetchFaculty();
  }, []);

  useEffect(() => {
    if (props.match.params.id) {
      props.fetchCourse(props.match.params.id);
    } else {
      props.resetCoursesFormData();
    }
  }, []);

  useEffect(() => {
    if (props.match.params.id && props.currentCourse.id) {
      props.setCoursesFormData({
        ...props.currentCourse,
        center_id: props.currentCourse.center.id,
        semester_id: props.currentCourse.semester.id,
        instructor_id: props.currentCourse.instructor
          ? props.currentCourse.instructor.id
          : "",
      });
    }
  }, [props.currentCourse]);

  //fetch students belonging to a center if one is selected
  useEffect(() => {
    const centerId = coursesFormData.center_id;
    if (centerId) fetchStudentsFromCenter(centerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesFormData.center_id]);

  useEffect(() => {
    reset(coursesFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  useEffect(() => {
    reset(props.coursesFormData);

    let students = [/*...selectedStudents,*/ ...props.coursesFormData.students];
    students = students.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    setSelectedStudents(students);
  }, [props.coursesFormData]);

  const onSubmit = () => {
    const formData = { ...coursesFormData };
    delete formData.students;
    formData.student_ids = selectedStudents.map((s) => s.id);

    let instructor = props.faculty.find((f) => f.id == formData.instructor_id)
    if (instructor) {
      formData.instructor_type = instructor.role
      formData.instructor_id = instructor.id

      if (props.match.params.id) {
        props.editCourse(props.match.params.id, formData).then((action) => {
          const course = action.payload;
          if (course.id) {
            props.history.push(`/cursos/${course.id}`);
          }
        });
      } else {
        createCourse(formData).then((action) => {
          const course = action.payload;
          if (course.id) {
            props.history.push(`/cursos/${course.id}`);
          }
        });
      }
    }
  };

  const generateForm = () => {
    switch (currentStep) {
      case 1:
        return <Students />;
      default:
        return <Details />;
    }
  };

  const tabs = ["Detalles", "Estudiantes"];

  const generateTabs = () => {
    return tabs.map((tab, index) => (
      <p
        key={index}
        className={`dark-purple-text ${
          index === currentStep ? "active-tab" : ""
        }`}
      >
        {tab}
      </p>
    ));
  };

  /* Beginning of code for button navigation and keeping track of current step in the form process */
  const handleClick = (name) => {
    if (name === "previous" && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (name === "next" && currentStep <= 0) {
      setCurrentStep(currentStep + 1);
    }
    props.setCoursesFormData({
      ...coursesFormData,
      ...getValues({ nest: true }),
    });
  };

  const generateButtons = () => {
    const hidden = currentStep === 0 ? "hidden" : "";
    return (
      <>
        <a
          className={`primary-btn ${hidden}`}
          onClick={() => handleClick("previous")}
        >
          Atrás
        </a>

        {currentStep !== 1 && (
          <a className="primary-btn" onClick={() => handleClick("next")}>
            Próximo
          </a>
        )}
        {currentStep === 1 && (
          <input type="submit" className="primary-btn" value="Guardar" />
        )}
      </>
    );
  };

  /* End of button navigation */

  return (
    <FormContext {...contextObjects}>
      <form
        className="courses-form-container courses-purple"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paper className="form-container" elevation={3}>
          {generateForm()}
        </Paper>
        <div className="courses-details-options">
          <div className="side-tabs">{generateTabs()}</div>
          <div className="courses-details-button-group">
            {" "}
            {generateButtons()}
          </div>
        </div>
      </form>
    </FormContext>
  );
};

const mapStateToProps = (state) => ({
  centers: state.centers.centers,
  centerWithStudents: state.centers.centerWithStudents,
  semesters: state.semesters.semesters,
  // teachers: state.users.teachers,
  coursesFormData: state.courses.coursesFormData,
  currentCourse: state.courses.currentCourse,
  faculty: state.faculty.faculty,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCenters: () => dispatch(fetchCenters()),
  fetchStudentsFromCenter: (centerId) =>
    dispatch(fetchStudentsFromCenter(centerId)),
  fetchSemesters: () => dispatch(fetchSemesters()),
  fetchFaculty: () => dispatch(fetchFacultyUsers()),
  setCoursesFormData: (formData) => dispatch(setCoursesFormData(formData)),
  fetchCourse: (id) => dispatch(fetchOneCourse(id)),
  createCourse: (formData) => dispatch(createCourse(formData)),
  editCourse: (courseId, formData) => dispatch(editCourse(courseId, formData)),
  resetCoursesFormData: () => dispatch(resetCoursesFormData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesFormContainer);
