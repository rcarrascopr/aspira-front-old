import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";

import { TextField } from "@material-ui/core";

import { SelectInput } from "../../../../commons/inputs/SelectInput";
import Error from "../../../../commons/inputs/Error";

import { semesterFormData as formData } from "../../../../commons/form-data/semesterFormData";

import {
  createSemester,
  editSemester,
} from "../../../../actions/semesterActions";

function SemesterForm(props) {
  const { control, errors, handleSubmit, watch, reset } = useForm(
    props.semester && props.semester.name
      ? { defaultValues: props.semester }
      : {}
  );

  useEffect(() => {
    if (!props.semester.name) {
      reset({ name: "", start_date: "", end_date: "" });
    }
  }, [props.semester]);

  const fieldNames = Object.keys(formData);

  const generateFields = () => {
    return fieldNames.map((field, index) => {
      if (!!formData[field] && formData[field].type === "date") {
        return (
          <div className="textfield-input" key={index}>
            <Controller
              as={
                <TextField
                  label={formData[field].label}
                  variant="outlined"
                  className={"dark-purple-text textfield-outlined"}
                  error={errors[field]}
                  type={formData[field].type}
                  InputLabelProps={{ shrink: true }}
                />
              }
              name={field}
              control={control}
              rules={{ required: formData[field].required }}
            />

            <Error errors={errors[field]} />
          </div>
        );
      } else if (!!formData[field] && formData[field].type === "select") {
        return (
          <SelectInput
            name={field}
            label={formData[field].label}
            invert={true}
            labelWidth={70}
            items={formData[field].items}
            control={control}
            errors={errors[field]}
          />
        );
      } else if (!!formData[field]) {
        return (
          <div className="textfield-input">
            <Controller
              as={
                <TextField
                  label={formData[field].label}
                  variant="outlined"
                  className={"dark-purple-text textfield-outlined"}
                  error={errors[field]}
                  type={formData[field].type}
                />
              }
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

  const onSubmit = (data, e) => {
    props.semester && props.semester.name
      ? props.editSemester(props.semester.id, data)
      : props.createSemester(data);
  };

  return (
    <section className="event-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="dark-purple-text">
          {" "}
          {props.semester && props.semester.name ? "Editar" : "Crear"} Semestre
        </h1>
        {generateFields()}
        <div
          style={{
            display: "flex",
            justifyContent: "Center",
            marginTop: "20px",
          }}
        >
          <input type="submit" className="primary-btn" value="Guardar" />
        </div>
      </form>
    </section>
  );
}

let mapDispatchToProps = (dispatch) => {
  return {
    createSemester: (formData) => dispatch(createSemester(formData)),
    editSemester: (semesterId, formData) =>
      dispatch(editSemester(semesterId, formData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(SemesterForm));
