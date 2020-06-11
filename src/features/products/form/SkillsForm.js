import React from "react";

import { Controller, useFieldArray } from "react-hook-form";
import { TextField } from "@material-ui/core";

import SelectInput from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

import { connect } from "react-redux";

function SkillsForm(props) {
  const { fields, append, remove } = useFieldArray({
    control: props.control,
    name: "level_ids",
  });

  const generateSkillsForms = () => {
    return fields.map((field, index) => {
      return (
        <fieldset>
          {" "}
          <SelectInput
            label="Destreza"
            invert={true}
            labelWidth={70}
            items={props.skills}
          />
          <SelectInput
            label="Dimensión"
            invert={true}
            labelWidth={70}
            items={[]}
            // value={typeof formData[field] === "string" ? formData[field] : formData[field].id}
            // handleChange={handleSelectChange}
          />
          <SelectInput
            name="level_ids"
            label={"Nivel"}
            invert={true}
            labelWidth={70}
            items={[]}
            // value={typeof formData[field] === "string" ? formData[field] : formData[field].id}
            // handleChange={handleSelectChange}
            control={props.control}
            errors={props.errors["level_ids"]}
          />
          <div className="step-trash" onClick={() => handleRemove(index)}>
            <img src="/assets/trash_icon.png" alt="Delete" />
          </div>
        </fieldset>
      );
    });
  };

  const handleRemove = () => {
    console.log(fields.length, fields);
    if (fields.length > 0) remove(fields.length - 1);
  };
  return (
    <div className="product-details-container">
      <h2 className="dark-purple-text product-details-header">
        Destrezas a desarrollar
      </h2>
      <div className="product-scrollable-container scrollable">
        {generateSkillsForms()}
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
        {/* <a className="primary-btn rounded" onClick={handleRemove}>
          -
        </a> */}
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    skills: state.skills.skills,
  };
};

export default connect(mapStateToProps)(SkillsForm);
