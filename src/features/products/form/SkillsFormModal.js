import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import SelectInput from "../../../commons/inputs/SelectInput";

export default function SkillsFormModal(props) {
  const [data, setData] = useState({ skill: "", dimension: "", level: "" });

  const handleChange = (event) => {
    if (event.target.name === "skill") {
      setData({ skill: event.target.value, dimension: "", level: "" });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const handleClick = () => {
    if (data["level"]) {
      let skill = props.skills.find((skill) => skill.id === data["skill"]);
      let dimension = skill.dimensions.find(
        (dimension) => dimension.id === data["dimension"]
      );
      let level = dimension.levels.find((level) => level.id === data["level"]);
      props.append({skill, dimension, level});
    }
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        className="dark-purple-text text-align-center
      "
      >
        Añadir niveles
        <hr />
      </DialogTitle>

      <DialogContent className="modal">
        <SelectInput
          name="skill"
          label="Destreza"
          invert={true}
          labelWidth={70}
          items={props.skills}
          handleChange={handleChange}
          value={data["skill"]}
        />
        <SelectInput
          name="dimension"
          label="Dimensión"
          invert={true}
          labelWidth={70}
          items={
            data["skill"]
              ? props.skills.find((skill) => skill.id === data["skill"])
                  .dimensions
              : []
          }
          disabled={data["skill"] ? false : true}
          value={data["dimension"]}
          handleChange={handleChange}
          // value={typeof formData[field] === "string" ? formData[field] : formData[field].id}
          // handleChange={handleSelectChange}
        />
        <SelectInput
          name="level"
          label={"Nivel"}
          invert={true}
          labelWidth={70}
          items={
            data["dimension"]
              ? props.skills
                  .find((skill) => skill.id === data["skill"])
                  .dimensions.find(
                    (dimension) => dimension.id === data["dimension"]
                  )
                  .levels.map((level) => {
                    return { name: `(${level.level}) ${level.description}`, id: level.id };
                  })
              : []
          }
          // value={typeof formData[field] === "string" ? formData[field] : formData[field].id}
          // handleChange={handleSelectChange}
          handleChange={handleChange}
          disabled={data["dimension"] ? false : true}
          value={data["level"]}
        />
        <div className="instructions-steps-btn-group">
          <a className="primary-btn rounded" onClick={handleClick}>
            +
          </a>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Volver
        </Button>
      </DialogActions>
    </Dialog>
  );
}
