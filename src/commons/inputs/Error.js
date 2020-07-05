import React from "react";

export default function Error(props) {
  const renderMessage = () => {
    if (!!props.errors) {
      return props.errors.message;
    } else {
      return "Esto es requerido.";
    }
  };

  return (
    <>
      {props.errors && (
        <p className="tooltip">
          ⚠️ <span className="tooltiptext">{renderMessage()}</span>
        </p>
      )}
    </>
  );
}
