import React from "react";

import TextField from "@material-ui/core/TextField";
import SelectInput from "../../../commons/inputs/SelectInput";

export const Details = (props) => {
  return (
    <div className="utis-details-container">
      <h1 className="dark-purple-text">UTIS: Detalles</h1>
      <TextField
        required
        id="utis-name"
        name="name"
        label="Nombre"
        value={props.utis.name}
        variant="outlined"
        onChange={props.handleChange}
        className={"dark-purple-text textfield-outlined"}

        // helperText={touched.debtorIin ? errors.debtorIin : ""}
        // error={touched.debtorIin && Boolean(errors.debtorIin)}
      />

      <SelectInput
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
        error={props.utis.category === ""}
      />

      <SelectInput
        name="semester"
        label="Semestre"
        invert={true}
        value={props.utis.semester}
        labelWidth={70}
        items={["2020-21", "2020-22"]}
        handleChange={props.handleChange}
      />

      <SelectInput
        name="center"
        label="Centro"
        invert={true}
        value={props.utis.center}
        labelWidth={70}
        items={["Aguada", "Moca", "Carolina"]}
        handleChange={props.handleChange}
      />

      <SelectInput
        name="teacher"
        label="Coordinador/GPH"
        invert={true}
        value={props.utis.teacher}
        labelWidth={130}
        items={["Kenneth R. Young Castro"]}
        handleChange={props.handleChange}
      />
      <SelectInput
        name="grade"
        label="Grado"
        invert={true}
        value={props.utis.grade}
        labelWidth={50}
        items={["10mo"]}
        handleChange={props.handleChange}
      />
    </div>
  );
};
