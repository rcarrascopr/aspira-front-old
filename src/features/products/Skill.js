import React from "react";

import { Paper } from "@material-ui/core";

export default function Skill(props) {
  return (
    <Paper
      elevation={2}
      className={`product-skill product-skill-${props.skill.name.toLowerCase()}`}
    >
      <h3 className="dark-purple-text">{props.skill.name}</h3>
      <p className="dark-purple-text">Dimensión: {props.dimension.name}</p>
      <p className="dark-purple-text">
        Nivel: {props.level.level} - {props.level.description}
      </p>
    </Paper>
  );
}
