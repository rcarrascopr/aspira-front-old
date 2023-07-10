import React, { useState } from "react";
import { connect } from "react-redux";
import "./reports.css";
import { ArrowDownload16Regular } from "@fluentui/react-icons";
import ReportsFilter from "./ReportsFilter";

export const ReportsContainer = (props) => {
  const [buttonStates, setButtonStates] = useState({
    aguada: true,
    carolina: true,
    mayagüez: true,
    moca: true,
  });

  const handleClick = (event) => {
    setButtonStates({
      ...buttonStates,
      [event.target.name]: !buttonStates[event.target.name],
    });
  };

  return (
    <section className="utis-container courses-purple">
      <section className="reports-container">
        <div className="reports-header" style={{ paddingBottom: "24px" }}>
          <h1 className="dark-purple-text text-align-center">Tablero</h1>
          <button className="primary-btn" onClick={() => {}}>
            <ArrowDownload16Regular /> Exportar
          </button>
        </div>
        <ReportsFilter buttonStates={buttonStates} handleClick={handleClick} />
        <div className="tablero-stats-cards-group">
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
          <div className="tablero-stats-card card">
            Productos asignados
            <h2>2,070</h2>
          </div>
        </div>
        <div className="ability-bar-graph card">
          <div className="school-ability-bar-graph-section"></div>
<div className="bar ser-ability-bar" ></div>
        </div>
      </section>
    </section>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer);
