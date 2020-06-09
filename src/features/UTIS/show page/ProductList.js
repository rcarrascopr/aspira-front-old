import React from "react";

import ProductListItem from "./ProductListItem";

import { withRouter } from "react-router-dom";

function ProductList(props) {
  const handleClick = () => {
    props.history.push("/utis/products/create");
  };
  const generateProductListItems = () => {
    return props.products.map((product) => {
      return <ProductListItem {...product} />;
    });
  };
  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2 className="dark-purple-text">Productos</h2>
        <a className="primary-btn" onClick={handleClick}>
          + Añadir
        </a>
      </div>
      <div>{generateProductListItems()}</div>
    </div>
  );
}

export default withRouter(ProductList);
