import React from "react";

function ProgressBar(props) {
  const { successPercentage } = props;
  return (
    <div>
      <div className="progress-bar">
        <div
          className="progress-bar-success"
          style={{ width: successPercentage + "%" }}
        ></div>
        <div
          className="progress-bar-danger"
          style={{ width: 100 - successPercentage + "%" }}
        ></div>
      </div>
      <p className="subtle-text text-align-center">
        {successPercentage}% Entregados
      </p>
    </div>
  );
}

export default ProgressBar;
