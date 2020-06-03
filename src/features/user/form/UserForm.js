import React, { useState } from "react";

import genders from "../../../commons/genders";
import grades from "../../../commons/grades";
import titles from "../../../commons/titles";
import centers from "../../../commons/centers";

import { SelectInput } from "../../../commons/inputs/SelectInput";

import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";

export default function UserForm(props) {
  const { control, errors, handleSubmit } = useForm();

  const [formData, setFormData] = useState({
    first_name: { type: "text", value: "", required: true, label: "Nombre" },
    second_name: {
      type: "text",
      value: "vinh",
      required: false,
      label: "Segundo nombre",
    },
    paternal_surname: {
      type: "text",
      value: "",
      required: true,
      label: "Apellido",
    },
    maternal_surname: {
      type: "text",
      value: "",
      required: false,
      label: "Apellido",
    },
    email: {
      type: "email",
      value: "",
      required: true,
      label: "Correo electrónico",
    },
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
    phone_number: { type: "tel", value: "", required: true, label: "Teléfono" },
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
    accountType: {
      type: "select",
      value: "",
      required: true,
      label: "Título",
      items: titles,
    },
  });

  // const [formData, setFormData] = useState();

  const handleChange = (e) => {
    const event = e[0];
    console.log(event.target.name, event.target.value);
    setFormData({
      ...formData,
    });
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
            </div>
          );
        })}
      </div>
    );
  };

  const generateOtherFields = () => {
    return otherFields.map((field) => {
      if (formData[field].type === "select") {
        return (
          <SelectInput
            name={field}
            label={formData[field].label}
            invert={true}
            value={formData[field].value}
            labelWidth={70}
            items={formData[field].items}
            handleChange={handleChange}
            control={control}
            errors={errors[field]}
          />
        );
      } else {
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
          </div>
        );
      }
    });
  };

  return (
    <form>
      {generateNameFields()}
      {generateOtherFields()}

      {/* <SelectInput
        name="category"
        label="Categoría"
        invert={true}
        value={props.utis.category}
        labelWidth={70}
        items={[
          "Socio-Humanístico",
          "Científico-Técnico",
          "Ocupacional",
          "Cultural",
          "Comunitaria",
        ]}
        handleChange={props.handleChange}
        control={props.control}
        errors={props.errors["category"]}
      /> */}
    </form>
  );
}
