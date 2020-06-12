import React, { useState, useEffect } from "react";

import { Prompt } from "react-router";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";

import InformationForm from "./InformationForm";
import SkillsForm from "./SkillsForm";
import InstructionsForm from "./InstructionsForm";

import { getSkills } from "../../../actions/SkillsActions";

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
  const [currentTab, setCurrentTab] = useState("information");
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);

  const { control, errors, handleSubmit, watch } = useForm({
    defaultValues: {
      steps: [],
      level_ids: [1],
    },
  });

  const onSubmit = (data, e) => {
    console.log("Submit event", e);
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    props.getSkills();
  });

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
    switch (currentTab) {
      case "instructions":
        return <InstructionsForm control={control} errors={errors} />;
      case "skills":
        return <SkillsForm control={control} errors={errors} />;
      default:
        return <InformationForm control={control} errors={errors} />;
    }
  };

  const generateTabs = () => {
    return tabs.map((tab, index) => (
      <p
        key={index}
        className={`dark-purple-text ${tab === currentTab ? "active-tab" : ""}`}
        onClick={() => setCurrentTab(tab)}
      >
        {tab}
      </p>
    ));
  };

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
                <input type="submit" className="primary-btn" value="Guardar" />
              </div>
            </div>
          </Paper>
        </div>
      </form>
    </div>
  );
}

let mapDispatchToProps = (dispatch) => {
  return {
    getSkills: () => dispatch(getSkills),
  };
};

export default connect(null, mapDispatchToProps)(ProductFormContainer);
