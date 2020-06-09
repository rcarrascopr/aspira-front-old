import React from "react";

export default function ProductListItem(props) {
  return (
    <div className="product-card">
      <h3 className="product-card-header">{props.name}</h3>
      <div className="product-card-content">
        <p>Entregados: {props.students_submitted} </p>
        <p>No Entregados: {props.students_not_submitted}</p>
      </div>
    </div>
  );
}
