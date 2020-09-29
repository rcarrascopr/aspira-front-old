import React from "react";

import { Paper } from "@material-ui/core";
import { Button } from "@material-ui/core";

export default function StatusCard() {
  const buttonStyles = {
    color: "#383784",
    textTransform: "capitalize",
    borderRadius: "5px",
  };
  return (
    <Paper elevation={1} className="student-side-card">
      <p className="dark-purple-text">
        <strong>Estatus de la tarea</strong>
      </p>
      <Button
        variant="contained"
        color="primary"
        className="button-main"
        disableElevation={true}
        href="#"
        style={{
          ...buttonStyles,
          background: "#f26e6e",
        }}
      >
        <strong style={{ fontSize: "40px", color: "white" }}>en proceso</strong>
      </Button>
    </Paper>
  );
}
