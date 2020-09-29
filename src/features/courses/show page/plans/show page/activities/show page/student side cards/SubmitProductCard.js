import React from "react";

import { Paper } from "@material-ui/core";
import FileAndLinkContainer from "../../../../../../../files and links/FileAndLinkContainer";

export default function SubmitProductCard() {
  return (
    <Paper elevation={1} className="student-side-card">
      <p className="dark-purple-text">
        <strong>Entrega de producto</strong>
      </p>
      <FileAndLinkContainer />
      <a className="tertiary-btn" style={{ width: "100%" }}>
        <strong>Entregar producto</strong>
      </a>
    </Paper>
  );
}
