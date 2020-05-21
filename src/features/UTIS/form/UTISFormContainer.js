import React, { useState, useEffect } from "react";

import { Prompt } from "react-router";

import Paper from "@material-ui/core/Paper";
import { Details } from "./Details";
import { Students } from "./Students";

import "./UTISForm.css";

export const UTISFormContainer = () => {
  const [tab, setTab] = useState("details");
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);

  const [utis, setUtis] = useState({
    name: "",
    category: "",
    semester: "",
    center: "",
    teacher: "",
    grade: "",
    students: [],
  });

  useEffect(() => {
    let isEmpty = true;
    for (let key in utis) {
      if (utis[key].length !== 0) {
        isEmpty = false;
      }
    }

    isEmpty ? setShouldBlockNavigation(false) : setShouldBlockNavigation(true);
  }, [utis]);

  useEffect(() => {
    if (shouldBlockNavigation) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [shouldBlockNavigation]);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setUtis({ ...utis, [event.target.name]: event.target.value });
  };

  return (
    <section className="utis-form-container courses-purple">
      <Prompt
        when={shouldBlockNavigation}
        message="Tienes cambios sin guardar, ¿Estás seguro que quieres salir?"
      />
      <Paper className="form-container" elevation={3}>
        <div className="utis-details">
          {tab === "details" ? (
            <Details handleChange={handleChange} utis={utis} />
          ) : (
            <Students setUtis={setUtis} utis={utis} />
          )}
        </div>
        <div className="utis-details-options">
          <div className="side-tabs">
            <p
              className={`dark-purple-text ${
                tab === "details" ? "active-tab" : ""
              }`}
              onClick={() => setTab("details")}
            >
              Detalles
            </p>
            <p
              className={`dark-purple-text ${
                tab === "students" ? "active-tab" : ""
              }`}
              onClick={() => setTab("students")}
            >
              Estudiantes
            </p>
          </div>
          <div className="utis-details-button-group">
            <a>Guardar</a>
          </div>
        </div>
      </Paper>
    </section>
  );
};
