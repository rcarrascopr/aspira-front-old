import React, { useState, useEffect } from "react";

import genders from "../../../commons/genders";
import grades from "../../../commons/grades";
import titles from "../../../commons/titles";
import centers from "../../../commons/centers";

import { SelectInput } from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

import {
  FormControl, 
  MenuItem, 
  Select, 
  TextField
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import "./userForm.css";

export default function UserForm(props) {
  const { control, errors, handleSubmit } = useForm();

  const [formData, setFormData] = useState({
    first_name: { type: "text", value: "", required: true, label: "Nombre" },
    second_name: {
      type: "text",
      value: "",
      required: false,
      label: "Segundo nombre",
    },
    paternal_surname: {
      type: "text",
      value: "",
      required: true,
      label: "Apellido 1",
    },
    maternal_surname: {
      type: "text",
      value: "",
      required: false,
      label: "Apellido 2",
    },
    email: {
      type: "email",
      value: "",
      required: true,
      label: "Correo electrónico",
    },
    phone_number: { type: "tel", value: "", required: true, label: "Teléfono" },
    password: {
      type: "password",
      value: "",
      required: true,
      label: "Contraseña",
    },
    password_confirmation: {
      type: "password",
      value: "",
      required: true,
      label: "Confirmar contraseña",
    },
    center: {
      type: "select",
      value: centers[0],
      required: true,
      label: "Centro",
      items: centers,
    },
    residence_municipality: {
      type: "text",
      value: "",
      required: true,
      label: "Municipio",
    },
    gender: {
      type: "select",
      value: genders[0],
      required: true,
      label: "Género",
      items: genders,
    },
    account_type: {
      type: "select",
      value: titles[0],
      required: true,
      label: "Título",
      items: titles,
    },
  });

  useEffect(() => {
    if (formData.account_type.value === "student") {
      setFormData(
        ...formData,
        (grades = {
          type: "select",
          value: grades[0],
          required: true,
          label: "Grado",
          items: grades,
        })
      );
    } else {
      setFormData({ ...formData, grades: undefined });
    }
  }, [formData.account_type]);

  const handleChange = (e) => {
    const event = e[0];
    setFormData({
      ...formData,
      [event.target.name]: {
        ...formData[event.target.name],
        value: event.target.value,
      },
    });
  };

  const handleSelectChange = (event) => {
    debugger;
    console.log(event.target.name, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: {
        ...formData[event.target.name],
        value: event.target.value,
      },
    });
  };

  const onSubmit = (data, e) => {
    console.log("Submit event", e);
    alert(JSON.stringify(data));
  };

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
                    value={formData[field].value}
                    variant="outlined"
                    className={"dark-purple-text textfield-outlined"}
                    error={errors[field]}
                  />
                }
                onChange={handleChange}
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
            value={formData[field].value}
            labelWidth={70}
            items={formData[field].items}
            handleChange={handleSelectChange}
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
                  id="student-name"
                  label={formData[field].label}
                  value={formData[field].value}
                  variant="outlined"
                  className={"dark-purple-text textfield-outlined"}
                  error={errors[field]}
                  type={formData[field].type}
                />
              }
              onChange={handleChange}
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

  return (
    <div className="user-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <h1 className="dark-purple-text text-align-center">Crear cuenta</h1>
        {generateNameFields()}
        <div className="details-inputs">{generateOtherFields()}</div>

        <div className="flex-end">
          <input type="submit" className="primary-btn " value="Guardar" />
        </div>
      </form>
    </div>
  );
}
