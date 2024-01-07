import React, { useState } from "react";
import {
  ChevronRight24Filled,
} from "@fluentui/react-icons";

function ReportsFilter(props) {
  const [showFilter, setShowFilter] = useState(false);

  const { buttonStates, handleClick } = props;
  return (
    <div className="reports-filter">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Filtros</p>

        <ChevronRight24Filled
          className={`chevron ${showFilter ? "rotate" : ""}`}
          onClick={() => setShowFilter(!showFilter)}
        />
      </div>

      <div
        className={`center-filter-buttons ${showFilter ? "" : "hide"}`}
        style={
          {
            // opacity: !showFilter ? "0" : "1",
            // transition: "all .8s",
            // visibility: !showFilter ? "hidden" : "visible",
            // display: showFilter ? "flex" : "none"
            // height: showFilter ? "auto" : "0px"
          }
        }
      >
        <p>Centro: </p>
        <a
          className={`btn center-btn ${
            props.buttonStates["aguada"] ? "btn-active" : ""
          }`}
          name="aguada"
          onClick={props.handleClick}
        >
          Aguada
        </a>
        <a
          className={`btn center-btn ${
            props.buttonStates["carolina"] ? "btn-active" : ""
          }`}
          name="carolina"
          onClick={props.handleClick}
        >
          Carolina
        </a>
        <a
          className={`btn center-btn ${
            props.buttonStates["mayagüez"] ? "btn-active" : ""
          }`}
          name="mayagüez"
          onClick={props.handleClick}
        >
          Mayagüez
        </a>
        <a
          className={`btn center-btn ${
            props.buttonStates["moca"] ? "btn-active" : ""
          }`}
          name="moca"
          onClick={props.handleClick}
        >
          Moca
        </a>
      </div>
    </div>
  );
}

export default ReportsFilter;
