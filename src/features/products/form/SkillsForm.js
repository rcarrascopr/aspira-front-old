import React, { useState, useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";

import SelectInput from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

import { setProductFormAction } from "../../../actions/productFormAction";

import SkillsFormModal from "./SkillsFormModal";
import Level from "./Level";

import { connect } from "react-redux";

function SkillsForm(props) {
  const [open, setOpen] = useState(false);
  const [levels, setLevels] = useState([]);

  const addLevel = (data) => {
    setLevels([...levels, data]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeLevel = (index) => {
    let levelsCopy = [...levels];
    levelsCopy.splice(index, 1);
    setLevels(levelsCopy);
  };

  const generateLevels = () => {
    return levels.map((level, index) => {
      return (
        <>
          <Level
            skill={level.skill}
            dimension={level.dimension}
            level={level.level}
            removeLevel={removeLevel}
            index={index}
          />

          {levels.length !== index + 1 && <hr />}
        </>
      );
    });
  };

  useEffect(() => {
    setLevels(props.productFormData.levels || []);
  }, []);

  useEffect(() => {
    props.setProductFormData({ ...props.productFormData, levels });
  }, [levels]);

  return (
    <div className="product-details-container">
      <h2 className="dark-purple-text product-details-header">
        Destrezas a desarrollar
      </h2>
      <div className="product-scrollable-container scrollable">
        {generateLevels()}
      </div>
      <div className="instructions-steps-btn-group">
        <a className="primary-btn rounded" onClick={handleClickOpen}>
          +
        </a>
        {/* <a className="primary-btn rounded" onClick={handleRemove}>
          -
        </a> */}
      </div>
      <SkillsFormModal
        open={open}
        handleClose={handleClose}
        skills={props.skills}
        append={addLevel}
      />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    skills: state.skills.skills,
    productFormData: state.productForm.productFormData,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    setProductFormData: (formData) => dispatch(setProductFormAction(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsForm);
