import React from "react";

import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function GradesTableHead(props) {
  const generateActivityNames = () => {
    return props.activities.map((activity) => (
      <TableCell
        align="center"
        colSpan={activity.product.levels.length + 1}
        className="cell-border-left table-header-activity"
      >
        {activity.name}
      </TableCell>
    ));
  };

  const generateProductNames = () => {
    return props.activities.map((activity) => (
      <TableCell
        align="center"
        colSpan={activity.product.levels.length + 1}
        className="cell-border-left"
      >
        {activity.product.title}
      </TableCell>
    ));
  };

  const generateHeaderTitles = () => {
    return props.activities.map((activity) => (
      <>
        <TableCell align="center" rowSpan="4" className="cell-border-left">
          Estatus
        </TableCell>
        <TableCell
          align="center"
          colSpan={activity.product.levels.length}
          className="cell-border-left"
        >
          Habilidades
        </TableCell>
      </>
    ));
  };

  const generateSkills = () => {
    let skills = [];

    for (let i = 0; i < props.activities.length; i++) {
      for (let j = 0; j < props.activities[i].product.levels.length; j++) {
        let skillName = props.activities[i].product.levels[j].skill.name;
        skills.push(
          <TableCell
            align="center"
            className={`header-${skillName.toLowerCase()} skill`}
          >
            {skillName}
          </TableCell>
        );
      }
    }

    return skills;
  };

  const generateDimensions = () => {
    let dimensions = [];

    for (let i = 0; i < props.activities.length; i++) {
      for (let j = 0; j < props.activities[i].product.levels.length; j++) {
        dimensions.push(
          <TableCell align="center" className="cell-border-left">
            Dimensión:
            {" " + props.activities[i].product.levels[j].dimension.name}
          </TableCell>
        );
      }
    }

    return dimensions;
  };

  const generateLevels = () => {
    let levels = [];

    for (let i = 0; i < props.activities.length; i++) {
      for (let j = 0; j < props.activities[i].product.levels.length; j++) {
        let currentLevel = props.activities[i].product.levels[j].level;
        levels.push(
          <TableCell align="center" className="cell-border-left">
            Nivel {currentLevel.level}:{" " + currentLevel.description}
          </TableCell>
        );
      }
    }

    return levels;
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" rowSpan="6">
          {" "}
          Nombre de Estudiantes
        </TableCell>
        {generateActivityNames()}
      </TableRow>
      <TableRow>{generateProductNames()}</TableRow>
      <TableRow>{generateHeaderTitles()}</TableRow>
      <TableRow>{generateSkills()}</TableRow>
      <TableRow>{generateDimensions()}</TableRow>
      <TableRow>{generateLevels()}</TableRow>
    </TableHead>
  );
}
