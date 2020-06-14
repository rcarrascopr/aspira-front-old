import React, { useState, useEffect } from "react";

import { Prompt } from "react-router";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import InformationForm from "./InformationForm";
import SkillsForm from "./SkillsForm";
import InstructionsForm from "./InstructionsForm";

import { getSkills } from "../../../actions/SkillsActions";
import { setProductFormAction } from "../../../actions/productFormAction";
import { createProduct } from "../../../actions/productActions";

import "./ProductFormContainer.css";

const tabs = ["information", "instructions", "skills"];

// const fake_products = [
//   {
//     name: "",
//     description: "",
//     introduction: "",
//     steps: [],
//     level_ids: [],
//   },
// ];

function ProductFormContainer(props) {
  // const [currentTab, setCurrentTab] = useState("information");
  const [currentStep, setCurrentStep] = useState(0);
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);

  const { control, errors, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: props.productFormData,
  });

  const onSubmit = (data, e) => {
    let level_ids = props.productFormData.levels.map((level) => level.level.id);

    console.log(
      JSON.stringify({
        ...props.productFormData,
        level_ids,
        course_id: props.match.params.id,
      })
    );

    props
      .createProduct({
        ...props.productFormData,
        level_ids,
        course_id: props.match.params.id,
      })
      .then((product) => {
        if (product.id) {
          props.history.push(
            `/courses/${props.match.params.id}/products/${product.id}`
          );
        }
      });

    // props.setProductFormData({ ...props.productFormData, ...data });
  };

  useEffect(() => {
    props.getSkills();
  }, []);

  useEffect(() => {
    reset(props.productFormData);
  }, [currentStep]);

  useEffect(() => {
    let isEmpty = true;
    for (let key in errors) {
      if (errors[key].length !== 0) {
        isEmpty = false;
      }
    }

    isEmpty ? setShouldBlockNavigation(false) : setShouldBlockNavigation(true);
  }, [errors]);

  useEffect(() => {
    if (shouldBlockNavigation) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [shouldBlockNavigation]);

  const generateForm = () => {
    const childrenProps = { control, errors };
    switch (currentStep) {
      case 1:
        return <InstructionsForm {...childrenProps} />;
      case 2:
        return <SkillsForm {...childrenProps} />;
      default:
        return <InformationForm {...childrenProps} />;
    }
  };

  const generateTabs = () => {
    return tabs.map((tab, index) => (
      <p
        key={index}
        className={`dark-purple-text ${
          index === currentStep ? "active-tab" : ""
        }`}
        // onClick={() => setCurrentTab(tab)}
      >
        {tab}
      </p>
    ));
  };

  /* Code for button navigation and keeping track of current step in the form process */

  const handleClick = (name) => {
    if (name === "previous" && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (name === "next" && currentStep <= 1) {
      setCurrentStep(currentStep + 1);
    }

    props.setProductFormData({
      ...props.productFormData,
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

        {currentStep !== 2 && (
          <a className="primary-btn" onClick={() => handleClick("next")}>
            Próximo
          </a>
        )}
        {currentStep === 2 && (
          <input type="submit" className="primary-btn" value="Guardar" />
        )}
      </>
    );
  };

  /* End of button navigation */

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="utis-form-container courses-purple"
      >
        <Prompt
          when={shouldBlockNavigation}
          message="Tienes cambios sin guardar, ¿Estás seguro que quieres salir?"
        />
        <div>
          <h1>Nombre del UTIS va Aquí - Materia o Detalles</h1>
          <p>Categoria </p>
          <Paper className="form-container" elevation={3}>
            <div className="utis-details">{generateForm()}</div>
            <div className="utis-details-options">
              <div className="side-tabs">{generateTabs()}</div>
              <div className="utis-details-button-group">
                {generateButtons()}
              </div>
            </div>
          </Paper>
        </div>
      </form>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    productFormData: state.productForm.productFormData,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getSkills: () => dispatch(getSkills()),
    setProductFormData: (formData) => dispatch(setProductFormAction(formData)),
    createProduct: (formData) => dispatch(createProduct(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductFormContainer);
