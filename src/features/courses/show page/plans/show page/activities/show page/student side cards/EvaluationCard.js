import React from "react";

import { Paper } from "@material-ui/core";
import Skill from "../../../../../../../products/Skill";

export default function EvaluationCard(props) {
  //   const generateSkillSection = () => {
  //     if (props.product.levels) {
  //       return (
  //         <>
  //           <p className="dark-purple-text">Habilidades</p>
  //           {generateSkills()}
  //         </>
  //       );
  //     }
  //   };

  const generateSkills = () => {
    if (props.product && props.product.levels) {
      return props.product.levels.map((level) => {
        let student = props.product.students.find(
          (s) => s.id === props.currentUser.id
        );
        if (student) {
          let grade = student.levels.find((l) => l.level.id === level.level.id);
          if (grade) {
            return (
              <div className="skill-evaluation-container">
                <Skill {...level} />
                <p className="skill-evaluation-text">{grade.grade ? "Aprobado" : "No Aprobado"}</p>
              </div>
            );
          }
        }
      });
    }
  };

  return (
    <Paper elevation={1} className="student-side-card">
      <p className="dark-purple-text">
        <strong>Evaluación de habilidades</strong>
      </p>
      {generateSkills()}

      <p className="dark-purple-text">
        <strong>Retroalimentación</strong>
      </p>
      <p>Lorem ipsum dorot mono et sae.</p>
    </Paper>
  );
}
