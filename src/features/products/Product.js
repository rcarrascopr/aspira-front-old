import React from "react";

import { Paper } from "@material-ui/core";
import "./product.css";

import FileAndLinkContainer from "../files and links/FileAndLinkContainer";
import Step from "./Step";
import Skill from "./Skill";

export default function Product(props) {
  const generateSteps = () => {
    if (props.product) {
      let steps = props.product.steps.map((s, index) => {
        return <Step index={index + 1} text={s} />;
      });
      return (
        <>
          <p className="dark-purple-text">Instrucciones</p>
          <div className="steps-container">{steps}</div>
        </>
      );
    }
  };

  const generateSkillSection = () => {
    if (props.product.levels) {
      return (
        <>
          <p className="dark-purple-text">Habilidades</p>
          {generateSkills()}
        </>
      );
    }
  };

  const generateSkills = () => {
    return props.product.levels.map((level) => {
      return <Skill {...level} />;
    });
  };

  return (
    <Paper className="product-card">
      <h3 className="dark-purple-text">Producto: {props.product.title}</h3>
      <p className="dark-purple-text">Descripción</p>
      <p className="dark-purple-text">{props.product.description}</p>
      <FileAndLinkContainer
        assignment={props.product}
        assignmentType={"Product"}
      />
      {generateSteps()}
      {generateSkillSection()}
    </Paper>
  );
}
