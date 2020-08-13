import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchActivity } from "../../../../../../../actions/activityActions";
import { Button } from "@material-ui/core";

import Product from "../../../../../../products/Product";

import FileAndLinkContainer from "../../../../../../files and links/FileAndLinkContainer";

import "./activityShowContainer.css";

const ActivityShowContainer = (props) => {
  const activityId = props.match.params.id;

  useEffect(() => {
    props.fetchActivity(activityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonStyles = {
    color: "#383784",
    textTransform: "capitalize",
    borderRadius: "5px",
  };

  const generateProductInformation = () => {
    if (props.currentActivity && props.currentActivity.product) {
      let product = props.currentActivity.product;
      return <Product product={product} />;
    }
  };

  const generateSubmittedProductsTable = () => {
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
                      <div className="product-circle pending" />
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
              href="#"
              style={{
                ...buttonStyles,
                background: "#c9ffa7",
                width: "180px",
              }}
            >
              <strong
                style={{ fontSize: "40px", marginRight: "10px", width: 24 }}
              >
                0
              </strong>
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
                width: "180px",
              }}
            >
              <strong style={{ fontSize: "40px", marginRight: "10px" }}>
                {product.students.length}
              </strong>
              <p className="button-text"> No Entregados</p>
            </Button>
          </div>
        </div>
      );
    }
  };

  const renderActivity = () => {
    if (!!props.currentActivity) {
      return (
        <div className="activity-container">
          <div className="info-wrapper">
            <h2 className="title">{props.currentActivity.name}</h2>
            <div className="info-container">
              <p className="dark-purple-text">Descripción</p>
              <p className="dark-purple-text">
                {props.currentActivity.description}
              </p>
              {props.currentActivity.id && (
                <FileAndLinkContainer
                  assignment={props.currentActivity}
                  assignmentType={"Activity"}
                />
              )}
            </div>
            {generateProductInformation()}
          </div>
          {generateSubmittedProductsTable()}
        </div>
      );
    }
  };

  return <div>{renderActivity()}</div>;
};

const mapStateToProps = (state) => {
  return {
    currentActivity: state.activities.currentActivity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchActivity: (activityId) => dispatch(fetchActivity(activityId)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityShowContainer);
