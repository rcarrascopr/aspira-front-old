import React, { useState, useEffect } from "react";

import grades from "../../../commons/data/grades";
import { userFormData as formData } from "../../../commons/form-data/userFormData";

import { SelectInput } from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

import { TextField } from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";

import { userCreate } from "../../../actions/userActions";
import "./userForm.css";

function UserForm(props) {
  const { control, errors, handleSubmit, watch, setValue } = useForm();

  console.log("centers: ", props.centers)
  formData.center_id.items = props.centers
  if (props.centers.length > 0){
    setValue("center_id", 1)
  }
  
  const accountType = watch("account_type");
  // const accountType = "student";

  const nameFields = Object.keys(formData).slice(0, 4);
  const others = Object.keys(formData);
  const otherFields = others.slice(4, others.length);

  const generateNameFields = () => {
    return (
      <div className="name-inputs">
        {nameFields.map((field) => {
          return (
            <div className="textfield-input">
              <Controller
                as={
                  <TextField
                    id="student-name"
                    label={formData[field].label}
                    variant="outlined"
                    className={"dark-purple-text textfield-outlined"}
                    error={errors[field]}
                  />
                }
                // onChange={handleChange}
                name={field}
                control={control}
                rules={{ required: formData[field].required }}
              />
              <Error errors={errors[field]} />
            </div>
          );
        })}
      </div>
    );
  };

  const generateOtherFields = () => {
    return otherFields.map((field) => {
      if (!!formData[field] && formData[field].type === "select") {
        return (
          <SelectInput
            name={field}
            label={formData[field].label}
            invert={true}
            labelWidth={70}
            items={formData[field].items}
            // value={typeof formData[field] === "string" ? formData[field] : formData[field].id}
            // handleChange={handleSelectChange}
            control={control}
            errors={errors[field]}
            defaultValue={formData[field].defaultValue}
          />
        );
      } else if (!!formData[field]) {
        return (
          <div className="textfield-input">
            <Controller
              as={
                <TextField
                  id="student-name"
                  label={formData[field].label}
                  variant="outlined"
                  className={"dark-purple-text textfield-outlined"}
                  error={errors[field]}
                  type={formData[field].type}
                />
              }
              // onChange={handleChange}
              name={field}
              control={control}
              rules={{ required: formData[field].required }}
            />
            <Error errors={errors[field]} />
          </div>
        );
      }
    });
  };

  const generateAcademicLevels = () => {
    if (accountType === "student") {
      return (
        // Using SelectInput component

        <SelectInput
          name="academic_level"
          label="Grados"
          invert={true}
          labelWidth={70}
          items={grades}
          // handleChange={handleSelectChange}
          control={control}
          defaultValue={grades[0]}
          errors={errors["academic_level"]}
        />
      );
    }
  };

  const onSubmit = (data, event) => {
    console.log(`Submitted data: `, data, `\n Event: `, event);
    props.userCreate(data);
  };

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <h1 className="dark-purple-text text-align-center">Crear cuenta</h1>
        {generateNameFields()}
        <div className="details-inputs">
          {generateOtherFields()} {generateAcademicLevels()}
        </div>

        <div className="flex-end">
          <input type="submit" className="primary-btn " value="Guardar" />
        </div>
      </form>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    centers: state.centers.centers
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    userCreate: (data) => dispatch(userCreate(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
