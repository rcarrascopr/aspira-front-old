import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../../actions/productActions";

export const Product = ({ fetchProduct, product, loading }) => {
  console.log("props: ", { product, loading });

  const productId = document.location.hash.split("products/").pop().toString();
  useEffect(() => {
    console.log("Current product's id: ", productId);
    fetchProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // useEffect(() => console.log("I got a product: ", product), []);

  const renderProduct = () => {
    if (!!product) {
      const { title, introduction, description, steps, students } = product;
      return (
        <div>
          <div className="product-container">
            <h1 className="title">{title}</h1>
            <h5>Introduction</h5>
            <p className="introduction">{introduction}</p>

            <h5>Description</h5>
            <p className="description">{description}</p>

            <h5>Steps</h5>
            {steps.map((s, index) => {
              return (
                <span>
                  <div className="step-number">{index + 1}</div>
                  <p className="instruction">{s}</p>
                </span>
              );
            })}
          </div>

          <div className="students-container">
            <h5>Productos Entregados</h5>
            <ul className="students-list">
              {students.map((student) => {
                const fullName = `${student.first_name} ${student.paternal_surname}`;
                return (
                  <li>
                    <span>
                      <p>{fullName}</p>
                      <a href={`/students/${student.id}`}>Detalles</a>
                    </span>
                  </li>
                );
              })}
            </ul>
            <span className="buttons-container">
              <button className="green-button">
                <strong>2</strong>
                Green Button
              </button>
              <button className="red-button">
                <strong>3</strong>
                Red Button
              </button>
            </span>
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
