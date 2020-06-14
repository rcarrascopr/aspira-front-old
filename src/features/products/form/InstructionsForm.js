import React from "react";

import { Controller, useFieldArray } from "react-hook-form";
import { TextField } from "@material-ui/core";

import Error from "../../../commons/inputs/Error";

export default function InstructionsForm(props) {
  const { fields, append, prepend, remove } = useFieldArray({
    control: props.control,
    name: "steps",
  });

  const generateSteps = () => {
    return fields.map((field, index) => {
      console.log(field);
      return (
        <div key={field.id} className="textfield-input">
          <div className="step">{index + 1}</div>
          <Controller
            as={
              <TextField
                // id={`step${index + 1}`}
                variant="outlined"
                className={"dark-purple-text textfield-outlined no-margin"}
                error={props.errors["steps"]}
              />
            }
            name={`steps[${index}]`}
            control={props.control}
            rules={{ required: true }}
          />
          <Error errors={props.errors["steps"]} />
          <div className="step-trash" onClick={() => handleRemove(index)}>
            <img src="/assets/trash_icon.png" alt="Delete" />
          </div>
        </div>
      );
    });
  };

  const handleRemove = (index) => {
    if (Number.isInteger(index)) remove(index);
  };
  return (
    <div className="product-details-container">
      <h2 className="dark-purple-text product-details-header">Instrucciones</h2>
      {/* <p className="dark-purple-text">Pasos:</p> */}
      <div className="product-scrollable-container scrollable">
        {generateSteps()}
      </div>
      <div className="instructions-steps-btn-group">
        <a
          className="primary-btn rounded"
          onClick={() => {
            append("");
          }}
        >
          +
        </a>
      </div>
    </div>
  );
}
