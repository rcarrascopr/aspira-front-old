import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Paper, Button } from "@material-ui/core";
import { Details } from "./Details";
import { Students } from "./Students";

import { fetchCenters } from "../../../actions/centerActions";

import "./UTISForm.css";

export const UTISFormContainer2 = ({ centers }) => {
  const { handleSubmit } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  let initialState = {
    utisName: "",
    studentName: "",
  };
  const [formData, setFormData] = useState(initialState);

  //fetch centers after mounted
  useEffect(() => {
    fetchCenters();
  }, [centers]);

  const onSubmit = (data, event) => {
    console.log("data form UTIS form: ", data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log("Current formData: ", formData);
  };

  const renderCurrentStep = () => {
    const childrenProps = { centers, handleChange, formData };
    switch (currentStep) {
      case 1:
        return <Students {...childrenProps} />;
      default:
        return <Details {...childrenProps} />;
    }
  };
  const handleClick = (event) => {
    event.preventDefault();
    const name = event.target.name;
    console.log(name);
    if (name === "previous" && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (name === "next" && currentStep <= 0) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <form className="utis-form-container courses-purple">
      <Paper className="form-container" elevation={3}>
        {renderCurrentStep()}
      </Paper>
      <div className="utis-details-options">
        <div className="side-tabs">
          <p>Current Step: {currentStep}</p>
          <p className="details">Details</p>
          <p className="students">Estudiantes</p>
        </div>
        <div className="button-container">
          <button name="previous" onClick={handleClick}>
            Previous
          </button>
          <button name="next" onClick={handleClick}>
            Next
          </button>
        </div>
        <button type="submit" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({ centers: state.centers.centers });

const mapDispatchToProps = (dispatch) => ({
  fetchCenters: dispatch(fetchCenters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UTISFormContainer2);
