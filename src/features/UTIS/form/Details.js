import React from "react";

import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import SelectInput from "../../../commons/inputs/SelectInput";
import Error from "../../../commons/inputs/Error";
import grades from "../../../commons/data/grades";

export const Details = (props) => {
  const { centers, semesters, teachers, control, errors } = props;
  console.log("props from Details: ", props);
  return (
    <div className="utis-details-container">
      <h1 className="dark-purple-text">UTIS: Detalles</h1>
      <div className="textfield-input">
        <Controller
          as={
            <TextField
              label="Nombre"
              variant="outlined"
              className={"dark-purple-text textfield-outlined"}
              error={errors["name"]}
            />
          }
          name="name"
          control={control}
          rules={{ required: true }}
        />
        <Error errors={errors["name"]} />
      </div>

      <SelectInput
        name="category"
        label="Categoría"
        invert={true}
        labelWidth={70}
        items={[
          "Socio-Humanístico",
          "Científico-Técnico",
          "Ocupacional",
          "Cultural",
          "Comunitaria",
        ]}
        control={control}
        errors={errors["category"]}
      />

      <SelectInput
        name="semester_id"
        label="Semestre"
        invert={true}
        labelWidth={70}
        items={semesters}
        control={control}
        errors={errors["semester_id"]}
      />

      <SelectInput
        name="center_id"
        label="Centro"
        invert={true}
        labelWidth={70}
        items={centers}
        control={control}
        errors={errors["center_id"]}
      />

      <SelectInput
        name="teacher_id"
        label="Coordinador/GPH"
        invert={true}
        labelWidth={130}
        items={teachers}
        control={control}
        errors={errors["teacher_id"]}
      />

      <SelectInput
        name="grade"
        label="Grado"
        invert={true}
        labelWidth={50}
        items={grades}
        control={control}
        errors={errors["grade"]}
      />
    </div>
  );
};
