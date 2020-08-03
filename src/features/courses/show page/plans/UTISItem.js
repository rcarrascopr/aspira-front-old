import React from "react";

export default function UTISItem(props) {
  return (
    <div className="utis-item">
      <h2>{props.utis.name}</h2>
      <div className="utis-item-product">
        <p>{props.utis.products.length} Productos</p>
      </div>
    </div>
  );
}
