import React, { useState, useEffect } from "react";

import genders from "../../../commons/genders";
import grades from "../../../commons/grades";
import titles from "../../../commons/titles";
import centers from "../../../commons/centers";

import { SelectInput } from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

import { FormControl, MenuItem, Select, TextField } from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import "./userForm.css";

export default function UserForm(props) {
  const { control, errors, handleSubmit, watch } = useForm();

  const accountType = watch("account_type");

  const formData = {
    first_name: { type: "text", required: true, label: "Nombre" },
    second_name: {
      type: "text",

      required: false,
      label: "Segundo nombre",
    },
    paternal_surname: {
      type: "text",

      required: true,
      label: "Apellido 1",
    },
    maternal_surname: {
      type: "text",

      required: false,
      label: "Apellido 2",
    },
    email: {
      type: "email",

      required: true,
      label: "Correo electrónico",
    },
    phone_number: { type: "tel", required: true, label: "Teléfono" },
    password: {
      type: "password",

      required: true,
      label: "Contraseña",
    },
    password_confirmation: {
      type: "password",

      required: true,
      label: "Confirmar contraseña",
    },
    center: {
      type: "select",

      required: true,
      label: "Centro",
      items: centers,
    },
    residence_municipality: {
      type: "text",

      required: true,
      label: "Municipio",
    },
    gender: {
      type: "select",

      required: true,
      label: "Género",
      items: genders,
    },
    account_type: {
      type: "select",

      required: true,
      label: "Título",
      items: titles,
    },
  };

  useEffect(() => {
    if (accountType === "student") {
      formData.grades = {
        type: "select",
        required: true,
        label: "Grado",
        items: grades,
      };
      console.log(formData)
    } else {
      delete formData.grades;
    }
  }, [watch("account_type")]);

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
            // handleChange={handleSelectChange}
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
