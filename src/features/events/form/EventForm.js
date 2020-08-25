import React, {useEffect} from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { withRouter } from "react-router-dom";

import { TextField } from "@material-ui/core";

import { SelectInput } from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

import { eventFormData as formData } from "../../../commons/form-data/eventFormData";

import "./EventForm.css";

import { createEvent, editEvent } from "../../../actions/eventActions";

function EventForm(props) {
  const { control, errors, handleSubmit, watch, reset } = useForm(
    props.event && props.event.name ? { defaultValues: props.event } : {}
  );

  useEffect(() => {
    if (!props.event.name){
      reset({name: "", description: "", date: "", category: ""})
    } 
  }, [props.event])

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
      } else if (!!formData[field] && formData[field].type === "textarea") {
        return (
          <div
            className="textfield-input"
            style={{ width: "400px" }}
            key={index}
          >
            <Controller
              as={
                <TextField
                  id={field}
                  label={formData[field].label}
                  variant="outlined"
                  rows={4}
                  multiline
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
    let event = { ...data, center_id: props.center_id };
    props.event && props.event.name
      ? props.editEvent(props.event.id, event)
      : props.createEvent(event);
  };

  return (
    <section className="event-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="dark-purple-text" style={{ textAlign: "center" }}>
          {props.event && props.event.name ? "Editar" : "Crear"} Evento
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
    createEvent: (formData) => dispatch(createEvent(formData)),
    editEvent: (eventId, formData) => dispatch(editEvent(eventId, formData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EventForm));
