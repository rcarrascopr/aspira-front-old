import genders from "../data/genders";
import titles from "../data/titles";
import municipalites from "../data/municipalities";

export const userFormData = {
  first_name: {
    type: "text",
    required: true,
    label: "Nombre",
  },
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
  phone_number: {
    type: "tel",
    required: true,
    label: "Teléfono",
  },
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
  center_id: {
    type: "select",
    defaultValue: "",
    required: true,
    label: "Centro",
    items: [],
  },
  residence_municipality: {
    type: "select",
    required: true,
    label: "Municipio",
    items: municipalites,
  },
  gender: {
    type: "select",
    required: true,
    label: "Género",
    items: genders,
  },
  role: {
    type: "select",
    required: true,
    label: "Título",
    items: titles,
  },
};
