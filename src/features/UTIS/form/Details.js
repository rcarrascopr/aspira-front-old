import React from "react";

import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import SelectInput from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";

export const Details = ({ centers, formData, handleChange }) => {
  return (
    <div className="utis-details-container">
      <h1 className="dark-purple-text">UTIS: Detalles</h1>
      <div className="textfield-input">
        <TextField
          name="utisName"
          label="Nombre"
          variant="outlined"
          className={"dark-purple-text textfield-outlined"}
          defaulValue={formData.utisName}
          value={formData.utisName}
          onChange={handleChange}
        />

        {/* <Error errors={props.errors["name"]} /> */}
      </div>

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
      />

      <SelectInput
        name="semester"
        label="Semestre"
        invert={true}
        value={props.utis.semester}
        labelWidth={70}
        items={["2020-21", "2020-22"]}
        handleChange={props.handleChange}
        control={props.control}
        errors={props.errors["semester"]}
      />

      <SelectInput
        name="center"
        label="Centro"
        invert={true}
        value={centers[0]}
        labelWidth={70}
        items={centers}
        handleChange={props.handleChange}
        control={props.control}
        errors={props.errors["center"]}
      />

      <SelectInput
        name="teacher"
        label="Coordinador/GPH"
        invert={true}
        value={props.utis.teacher}
        labelWidth={130}
        items={["Kenneth R. Young Castro"]}
        handleChange={props.handleChange}
        // control={props.control}
        // errors={props.errors["teacher"]}
      />
      <SelectInput
        name="grade"
        label="Grado"
        invert={true}
        value={props.utis.grade}
        labelWidth={50}
        items={["10mo"]}
        handleChange={props.handleChange}
        control={props.control}
        errors={props.errors["grade"]}
      /> */}
    </div>
  );
};
