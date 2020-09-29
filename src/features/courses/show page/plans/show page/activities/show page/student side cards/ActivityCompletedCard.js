import React from "react";

import { Paper } from "@material-ui/core";

export default function ActivityCompletedCard() {
  return (
    <Paper elevation={1} className="student-side-card">
      <p className="dark-purple-text">
        <strong>He completado la actividad</strong>
      </p>
      <a className="tertiary-btn" style={{ width: "100%" }}>
        <strong>Confirmar</strong>
      </a>
    </Paper>
  );
}
