import genders from "../data/genders";
import titles from "../data/titles";
import centers from "../data/centers";

export const userFormData = {
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
    defaultValue: centers[0],
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
    defaultValue: genders[0],
    required: true,
    label: "Género",
    items: genders,
  },
  account_type: {
    type: "select",
    defaultValue: titles[0],
    required: true,
    label: "Título",
    items: titles,
  },
};
