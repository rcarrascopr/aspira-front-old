import React, { useState, useEffect } from "react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import SelectInput from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

import { setProductFormAction } from "../../../actions/productFormAction";

import SkillsFormModal from "./SkillsFormModal";
import Level from "./Level";

import { connect } from "react-redux";

function SkillsForm(props) {
  const [open, setOpen] = useState(false);
  const [levels, setLevels] = useState([]);
  const [hasSkills, setHasSkills] = useState(true);

  const addLevel = (data) => {
    setLevels([...levels, data]);
  };

  const handleClickOpen = () => {
    if (hasSkills) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeLevel = (index) => {
    if (hasSkills) {
      let levelsCopy = [...levels];
      levelsCopy.splice(index, 1);
      setLevels(levelsCopy);
    }
  };

  const handleCheckboxChange = () => {
    setHasSkills(!hasSkills);
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
    setHasSkills(props.productFormData.has_skills);
  }, []);

  useEffect(() => {
    props.setProductFormData({ ...props.productFormData, levels });
  }, [levels]);

  useEffect(() => {
    props.setProductFormData({
      ...props.productFormData,
      has_skills: hasSkills,
    });
  }, [hasSkills]);

  return (
    <div className="product-details-container">
      <h2 className="dark-purple-text product-details-header">
        Habilidades a desarrollar
      </h2>
      <FormControlLabel
        control={
          <Checkbox
            checked={hasSkills}
            onChange={handleCheckboxChange}
            name="hasSkills"
            color="primary"
          />
        }
        label="En esta actividad se evaluarán habilidades"
      />

      <div
        className={`product-scrollable-container scrollable ${
          hasSkills ? "" : "disabled"
        }`}
      >
        {generateLevels()}
      </div>
      <div className="instructions-steps-btn-group">
        <a
          className={`primary-btn rounded ${hasSkills ? "" : "disabled"}`}
          onClick={handleClickOpen}
        >
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
