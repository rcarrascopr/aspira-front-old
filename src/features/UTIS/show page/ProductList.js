import React, { useContext } from "react";

import ProductListItem from "./ProductListItem";

import { withRouter } from "react-router-dom";
import CourseContext from "../../../contexts/CourseContext";

function ProductList(props) {
  const course = useContext(CourseContext);

  const handleClick = () => {
    props.history.push("/utis/1/products/create");
  };

  const generateProductListItems = () => {
    if (!!course) {
      return course.products.map((product) => {
        console.log(product);
        return <ProductListItem {...product} />;
      });
    }
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
