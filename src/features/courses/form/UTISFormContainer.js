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
import { setUTISFormData, createCourse } from "../../../actions/utisActions";

import "./UTISForm.css";
import "../../products/form/ProductFormContainer.css";

const UTISFormContainer = (props) => {
  const {
    centers,
    centerWithStudents,
    semesters,
    teachers,
    utisFormData,
    setUTISFormData,
    fetchCenters,
    fetchSemesters,
    fetchTeachers,
    fetchStudentsFromCenter,
    createCourse,
  } = props;

  const { control, errors, reset, handleSubmit, getValues } = useForm({
    defaultValues: utisFormData,
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
    utisFormData,
    setUTISFormData,
  };

  //fetch centers after mounted
  useEffect(() => {
    fetchCenters();
    fetchSemesters();
    fetchTeachers();
  }, []);

  //fetch students belonging to a center if one is selected
  useEffect(() => {
    const centerId = utisFormData.center_id;
    if (centerId) fetchStudentsFromCenter(centerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utisFormData.center_id]);

  useEffect(() => {
    reset(utisFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const onSubmit = () => {
    const formData = { ...utisFormData };
    delete formData.students;
    formData.student_ids = utisFormData.students.map((s) => s.id);
    createCourse(formData).then((action) => {
      const course = action.payload;
      if (course.id) {
        props.history.push(`/utis/${course.id}`);
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
    setUTISFormData({
      ...utisFormData,
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
        className="utis-form-container courses-purple"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paper className="form-container" elevation={3}>
          {generateForm()}
        </Paper>
        <div className="utis-details-options">
          <div className="side-tabs">{generateTabs()}</div>
          <div className="utis-details-button-group"> {generateButtons()}</div>
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
  utisFormData: state.utis.utisFormData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCenters: () => dispatch(fetchCenters()),
  fetchStudentsFromCenter: (centerId) =>
    dispatch(fetchStudentsFromCenter(centerId)),
  fetchSemesters: () => dispatch(fetchSemesters()),
  fetchTeachers: () => dispatch(fetchTeachers()),
  setUTISFormData: (formData) => dispatch(setUTISFormData(formData)),
  createCourse: (formData) => dispatch(createCourse(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UTISFormContainer);
