import React from "react";

export const ButtonGroup = (props) => {
  return (
    <section className="btn-group">
      <a
        className={`btn btn-1 ${
          props.buttonStates["socio-humanístico"] ? "btn-active" : ""
        }`}
        name="socio-humanístico"
        onClick={props.handleClick}
      >
        Socio-Humanístico
      </a>
      <a
        className={`btn btn-2 ${
          props.buttonStates["científico-técnico"] ? "btn-active" : ""
        }`}
        name="científico-técnico"
        onClick={props.handleClick}
      >
        Científico-Técnico
      </a>
      <a
        className={`btn btn-3 ${
          props.buttonStates["ocupacional"] ? "btn-active" : ""
        }`}
        name="ocupacional"
        onClick={props.handleClick}
      >
        Ocupacional
      </a>
      <a
        className={`btn btn-4 ${
          props.buttonStates["cultural"] ? "btn-active" : ""
        }`}
        name="cultural"
        onClick={props.handleClick}
      >
        Cultural
      </a>
      <a
        className={`btn btn-5 ${
          props.buttonStates["comunitaria"] ? "btn-active" : ""
        }`}
        name="comunitaria"
        onClick={props.handleClick}
      >
        Comunitaria
      </a>
      <a
        className={`btn btn-6 ${
          props.buttonStates["electivo"] ? "btn-active" : ""
        }`}
        name="electivo"
        onClick={props.handleClick}
      >
        Electivo 
      </a>
    </section>
  );
};
