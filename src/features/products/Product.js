import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../../actions/productActions";
import { Button } from "@material-ui/core";

import "./Product.css";

export const Product = ({ fetchProduct, product, loading }) => {
  console.log("props: ", { product, loading });

  const productId = document.location.hash.split("products/").pop();

  useEffect(() => {
    console.log("Current product's id: ", productId);
    fetchProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const buttonStyles = {
    color: "#383784",
    textTransform: "capitalize",
    borderRadius: "5px",
  };
  const renderProduct = () => {
    if (!!product) {
      const { title, introduction, description, steps, students } = product;
      return (
        <div className="product-container">
          <div className="info-wrapper">
            <h2 className="title">{title}</h2>
            <div className="info-container">
              <p className="dark-purple-text">Introduction</p>
              <p className="large-paragraph dark-purple-text">{introduction}</p>

              <p className="dark-purple-text">Description</p>
              <p className="large-paragraph dark-purple-text">{description}</p>

              <p>Steps</p>
              <div className="steps-container">
                {steps.map((s, index) => {
                  return (
                    <div key={index + 1} className="step-box">
                      <p className="step-number">{index + 1}</p>
                      <p className="step-instruction">{s}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="students-container">
            <h5>Productos Entregados</h5>
            <ul className="students-list">
              {students.map((student) => {
                const fullName = `${student.first_name} ${student.paternal_surname}`;
                return (
                  <li className="students-list-item">
                    <p>{fullName}</p>
                    <a href={`/students/${student.id}`}>Detalles</a>
                  </li>
                );
              })}
            </ul>
            <div className="buttons-container">
              <Button
                variant="contained"
                color="primary"
                className="button-main"
                disableElevation={true}
                href="#"
                style={{
                  ...buttonStyles,
                  background: "#c9ffa7",
                }}
              >
                <strong>5</strong>
                <p className="button-text">Entregados</p>
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="button-main"
                disableElevation={true}
                href="#"
                style={{
                  ...buttonStyles,
                  background: "#f26e6e",
                }}
              >
                <strong>4</strong>
                <p className="button-text">No Entregados</p>
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{renderProduct()}</div>;
};

const mapStateToProps = (state) => ({ ...state.products });

const mapDispatchToProps = (dispatch) => {
  return { fetchProduct: (productId) => dispatch(fetchProduct(productId)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
