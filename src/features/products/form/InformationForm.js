import React from "react";

import { Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

import Error from "../../../commons/inputs/Error";

export default function InformationForm(props) {
  return (
    <div className="product-details-container">
      <h2 className="dark-purple-text product-details-header">Información</h2>
      <div className="textfield-input" style={{ width: "400px" }}>
        <Controller
          as={
            <TextField
              id="title"
              label={"Título"}
              variant="outlined"
              className={"dark-purple-text textfield-outlined"}
              error={props.errors["title"]}
            />
          }
          // onChange={handleChange}
          name="title"
          control={props.control}
          rules={{ required: true }}
        />
        <Error errors={props.errors["title"]} />
      </div>
      {/* <div className="textfield-input" style={{ width: "400px" }}>
        <Controller
          as={
            <TextField
              id="introduction"
              label={"Introducción"}
              variant="outlined"
              rows={4}
              multiline
              className={"dark-purple-text textfield-outlined"}
              error={props.errors["introduction"]}
            />
          }
          // onChange={handleChange}
          name="introduction"
          control={props.control}
          rules={{ required: true }}
        />
        <Error errors={props.errors["introduction"]} />
      </div> */}
      <div className="textfield-input" style={{ width: "400px" }}>
        <Controller
          as={
            <TextField
              id="description"
              label={"Breve descripción"}
              variant="outlined"
              rows={4}
              multiline
              className={"dark-purple-text textfield-outlined"}
              error={props.errors["description"]}
            />
          }
          // onChange={handleChange}
          name="description"
          control={props.control}
          rules={{ required: true }}
        />
        <Error errors={props.errors["description"]} />
      </div>
    </div>
  );
}
