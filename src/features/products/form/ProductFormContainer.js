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
import {
  createProduct,
  fetchProduct,
  updateProduct,
} from "../../../actions/productActions";
import { fetchActivity } from "../../../actions/activityActions";

import "./ProductFormContainer.css";

const tabs = ["información", "instrucciones", "habilidades"];

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

  function handlePromise(product) {
    if (product && product.payload && product.payload.id) {
      props.history.push(`/actividades/${props.match.params.id}`);
    }
  }

  const onSubmit = (data, e) => {
    let level_ids = props.productFormData.levels.map((level) => level.level.id);

    // console.log(
    //   JSON.stringify({
    //     ...props.productFormData,
    //     level_ids,
    //     activity_id: props.match.params.id,
    //   })
    // );

    let formData = {
      ...props.productFormData,
      level_ids,
      activity_id: props.match.params.id,
    };

    let productId = props.match.params.product_id;

    if (productId) {
      props.updateProduct(productId, formData).then(handlePromise);
    } else {
      props.createProduct(formData).then(handlePromise);
    }

    // props.setProductFormData({ ...props.productFormData, ...data });
  };

  useEffect(() => {
    props.getSkills();
    let activityId = props.match.params.id;
    if (activityId) {
      props.fetchActivity(activityId);
    }
    let productId = props.match.params.product_id;
    if (productId) {
      props.fetchProduct(productId);
    }
  }, []);

  useEffect(() => {
    reset(props.productFormData);
  }, [currentStep]);

  useEffect(() => {
    if (props.currentProduct.id && props.skills.length > 0) {
      let levels = props.currentProduct.levels.map((level) => {
        return {
          level: level,
          dimension: level.dimension,
          skill: props.skills.find(
            (skill) => skill.id === level.dimension.skill_id
          ),
        };
      });

      let currentProduct = { ...props.currentProduct };
      currentProduct.levels = levels;

      props.setProductFormData(currentProduct);

      reset(currentProduct);
    }
  }, [props.currentProduct, props.skills]);

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
    <div style={{ height: "100%" }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="courses-form-container courses-purple"
      >
        <Prompt
          when={shouldBlockNavigation}
          message="Tienes cambios sin guardar, ¿Estás seguro que quieres salir?"
        />
        <div>
          <h1 className="dark-purple-text">
            {props.match.params.product_id
              ? "Editar producto"
              : "Crear producto"}
          </h1>
          <p className="dark-purple-text sub-header-text">
            Actividad:{" "}
            {props.currentActivity.name ? props.currentActivity.name : ""}
          </p>
          {/* <p className="dark-purple-text">Categoria </p> */}
          <Paper className="form-container" elevation={3}>
            <div className="courses-details">{generateForm()}</div>
            <div className="courses-details-options">
              <div className="side-tabs">{generateTabs()}</div>
              <div className="courses-details-button-group">
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
    currentActivity: state.activities.currentActivity,
    currentProduct: state.products.currentProduct,
    skills: state.skills.skills,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    getSkills: () => dispatch(getSkills()),
    setProductFormData: (formData) => dispatch(setProductFormAction(formData)),
    createProduct: (formData) => dispatch(createProduct(formData)),
    fetchActivity: (activityId) => dispatch(fetchActivity(activityId)),
    fetchProduct: (productId) => dispatch(fetchProduct(productId)),
    updateProduct: (productId, formData) =>
      dispatch(updateProduct(productId, formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductFormContainer);
