import React from "react";

export default function Error(props) {
  return (
    <>
      {props.errors && (
        <p className="tooltip">
          ⚠️ <span className="tooltiptext">Esto es requerido.</span>
        </p>
      )}
    </>
  );
}
