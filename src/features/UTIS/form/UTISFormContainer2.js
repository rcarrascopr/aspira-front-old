import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Paper, Button } from "@material-ui/core";
import { Details } from "./Details";
import { Students } from "./Students";

import { fetchCenters } from "../../../actions/centerActions";
import { fetchTeachers } from "../../../actions/userActions";
import { fetchSemesters } from "../../../actions/semesterActions";
import { setUTISFormData } from "../../../actions/utisActions";

import "./UTISForm.css";
import "../../products/form/ProductFormContainer.css";

export const UTISFormContainer2 = (props) => {
  const {
    centers,
    semesters,
    teachers,
    utisFormData,
    fetchCenters,
    fetchSemesters,
    fetchTeachers,
  } = props;

  const { control, errors, reset, handleSubmit } = useForm({
    defaultValues: utisFormData,
  });
  const [currentStep, setCurrentStep] = useState(0);

  //fetch centers after mounted
  useEffect(() => {
    fetchCenters();
    fetchSemesters();
    fetchTeachers();
  }, [fetchCenters, fetchSemesters, fetchTeachers]);

  console.log("Props from UTIS Form: ", props);

  const onSubmit = (data, event) => {
    console.log("data form UTIS form: ", data);
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  //   console.log("Current formData: ", formData);
  // };

  const generateForm = () => {
    const childrenProps = { control, errors, reset };
    const detailsProps = { centers, semesters, teachers };
    switch (currentStep) {
      case 1:
        return <Students />;
      default:
        return <Details {...childrenProps} {...detailsProps} />;
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

  /* Code for button navigation and keeping track of current step in the form process */
  const handleClick = (name) => {
    console.log("button name: ", name);
    if (name === "previous" && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (name === "next" && currentStep <= 0) {
      setCurrentStep(currentStep + 1);
    }
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
    <form
      className="utis-form-container courses-purple"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Paper className="form-container" elevation={3}>
        {generateForm()}
      </Paper>
      <div className="utis-details-options">
        <div className="side-tabs">
          <p>Current Step: {currentStep}</p>

          {generateTabs()}
        </div>
        <div className="utis-details-button-group"> {generateButtons()}</div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  centers: state.centers.centers,
  semesters: state.semesters.semesters,
  teachers: state.users.teachers,
  utisFormData: state.utis.utisFormData,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCenters: () => dispatch(fetchCenters()),
  fetchSemesters: () => dispatch(fetchSemesters()),
  fetchTeachers: () => dispatch(fetchTeachers()),
  setUTISFormData: (data) => dispatch(setUTISFormData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UTISFormContainer2);
