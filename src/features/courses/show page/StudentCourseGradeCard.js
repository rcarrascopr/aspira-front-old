import React from "react";

import { calculatePercentage } from "../../../commons/common_methods";

export default function StudentCourseGradeCard(props) {
  return (
    <div className="card">
      <h3 className="dark-purple-text" style={{ marginBottom: "0px" }}>
        Evaluación del {props.evaluationType}
      </h3>
      <div className="student-course-grade-content">
        <h1 className="dark-purple-text" style={{ fontSize: "2.5em" }}>
          {props.products_passed || 0}/{props.amount_of_products || 0}
        </h1>

        <div>
          <p className="dark-purple-text" style={{ margin: "0px" }}>
            Productos
          </p>{" "}
          <p className="dark-purple-text" style={{ margin: "0px" }}>
            aprobados
          </p>
        </div>
      </div>

      <div
        className={`course-grade-percentage ${
          props.status == "Aprobado" ? "green" : "red"
        }`}
      >
        <h1
          className="white-text"
          style={{ margin: "10px 0px", fontSize: "3em" }}
        >
          {calculatePercentage(props.products_passed, props.amount_of_products) || 0}
          %
        </h1>
      </div>
    </div>
  );
}
