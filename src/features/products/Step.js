import React from "react";

import { Paper } from "@material-ui/core";

export default function Step(props) {
  return (
    <Paper key={props.index} elevation={2} className="step-box">
      <p className="step-number">{props.index}</p>
      <p className="step-instruction">{props.text}</p>
    </Paper>
  );
}
