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
import { fetchTeachers } from "../../../actions/userActions";
import { fetchSemesters } from "../../../actions/semesterActions";
import {
  setCoursesFormData,
  createCourse,
  fetchOneCourse,
} from "../../../actions/courseActions";

import "./CoursesForm.css";
import "../../products/form/ProductFormContainer.css";

const CoursesFormContainer = (props) => {
  const {
    centers,
    centerWithStudents,
    semesters,
    teachers,
    coursesFormData,
    setcoursesFormData,
    fetchCenters,
    fetchSemesters,
    fetchTeachers,
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
    teachers,
    selectedStudents,
    setSelectedStudents,
    coursesFormData,
    setCoursesFormData,
  };

  console.log(contextObjects);

  //fetch centers after mounted
  useEffect(() => {
    fetchCenters();
    fetchSemesters();
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (props.match.params.id) {
      props.fetchCourse(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.match.params.id) {
      props.setCoursesFormData(props.currentCourse);
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
  }, [props.coursesFormData]);

  const onSubmit = () => {
    const formData = { ...coursesFormData };
    delete formData.students;
    formData.student_ids = coursesFormData.students.map((s) => s.id);
    createCourse(formData).then((action) => {
      const course = action.payload;
      if (course.id) {
        props.history.push(`/course/${course.id}`);
      }
    });
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
    setcoursesFormData({
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
  teachers: state.users.teachers,
  coursesFormData: state.courses.coursesFormData,
  currentCourse: state.courses.currentCourse,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCenters: () => dispatch(fetchCenters()),
  fetchStudentsFromCenter: (centerId) =>
    dispatch(fetchStudentsFromCenter(centerId)),
  fetchSemesters: () => dispatch(fetchSemesters()),
  fetchTeachers: () => dispatch(fetchTeachers()),
  setCoursesFormData: (formData) => dispatch(setCoursesFormData(formData)),
  fetchCourse: (id) => dispatch(fetchOneCourse(id)),
  createCourse: (formData) => dispatch(createCourse(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesFormContainer);
