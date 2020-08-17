import React from "react";

export default function Level(props) {
  return (
    <div className="level">
      <p className="dark-purple-text">
        <strong>Nivel {props.level.level}: </strong>
        {props.level.description}
      </p>
      <p className="dark-purple-text">
        <strong>Habilidad: </strong>
        {props.skill.name}
      </p>
      <p className="dark-purple-text">
        <strong>Dimensión: </strong>
        {props.dimension.name}
      </p>
      <div
        className="step-trash"
        onClick={() => props.removeLevel(props.index)}
      >
        <img src="/assets/trash_icon.png" alt="Delete" />
      </div>
    </div>
  );
}
