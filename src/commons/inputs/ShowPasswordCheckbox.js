import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";

export default function ShowPasswordCheckbox(props) {
  const { checked, handleChange } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          name="show-password-checkbox"
          checked={checked}
          onChange={handleChange}
        />
      }
      label="Mostrar Contraseña?"
    />
  );
}
