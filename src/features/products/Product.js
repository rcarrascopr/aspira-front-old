import React from "react";

import { Paper } from '@material-ui/core';
import "./product.css";

import FileAndLinkContainer from "../files and links/FileAndLinkContainer";

export default function Product(props) {
  const generateSteps = () => {
    if (props.product) {
      let steps = props.product.steps.map((s, index) => {
        return (
          <div key={index + 1} className="step-box">
            <p className="step-number">{index + 1}</p>
            <p className="step-instruction">{s}</p>
          </div>
        );
      });
      return (
        <>
          <p>Instrucciones</p>
          <div className="steps-container">{steps}</div>
        </>
      );
    }
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
      </Paper>
  );
}
