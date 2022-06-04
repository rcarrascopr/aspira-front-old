import React from "react";

import { Button } from "@material-ui/core";

export default function SubmittedProductsTable(props) {
  const buttonStyles = {
    color: "#383784",
    textTransform: "capitalize",
    borderRadius: "5px",
  };

  const generateTable = () => {
    if (props.currentActivity.product) {
      let product = props.currentActivity.product;
      return (
        <div className="student-submissions">
          <div className="student-submissions-content">
            <h3 className="dark-purple-text" style={{ textAlign: "center" }}>
              Productos Entregados
            </h3>
            <ul className="students-list">
              {product.students.map((student) => {
                const fullName = `${student.first_name} ${student.paternal_surname} ${student.maternal_surname}`;
                return (
                  <li className="students-list-item">
                    <p>
                      <div
                        className={`product-circle ${
                          student.student_product &&
                          student.student_product.submitted
                            ? "submitted"
                            : "pending"
                        }`}
                      />
                      {fullName}
                    </p>
                    {/* <a href={`/students/${student.id}`}>Detalles</a> */}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="buttons-container">
            <Button
              variant="contained"
              color="primary"
              className="button-main"
              disableElevation={true}
              href={`/#/actividades/${props.currentActivity.id}/productos/evaluar`}
              style={{
                ...buttonStyles,
                background: "#c9ffa7",
                width: "180px",
              }}
            >
              <strong
                style={{ fontSize: "40px", marginRight: "10px" }}
              >
                {product.students.reduce((total, student) => {
                  if (
                    student.student_product &&
                    student.student_product.submitted
                  ) {
                    return total + 1;
                  } else {
                    return total;
                  }
                }, 0)}
              </strong>
              <p className="button-text">Entregados</p>
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="button-main"
              disableElevation={true}
              href={`/#/actividades/${props.currentActivity.id}/productos/evaluar`}
              style={{
                ...buttonStyles,
                background: "#f26e6e",
                width: "180px",
              }}
            >
              <strong style={{ fontSize: "40px", marginRight: "10px" }}>
                {product.students.reduce((total, student) => {
                  if (
                    student.student_product &&
                    !student.student_product.submitted
                  ) {
                    return total + 1;
                  } else {
                    return total;
                  }
                }, 0)}
              </strong>
              <p className="button-text"> No Entregados</p>
            </Button>
          </div>
        </div>
      );
    }
  };
  return <>{generateTable()}</>;
}
