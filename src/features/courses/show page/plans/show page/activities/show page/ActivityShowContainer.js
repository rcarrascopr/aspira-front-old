import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchActivity } from "../../../../../../../actions/activityActions";
import { Button } from "@material-ui/core";

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
  const renderActivity = () => {
    if (!!props.currentActivity) {
      // const { title, introduction, description, steps, students } = product;
      return (
        <div className="product-container">
          <div className="info-wrapper">
            <h2 className="title">{props.currentActivity.name}</h2>
            <div className="info-container">
              <p className="dark-purple-text">Description</p>
              {/* <p className="large-paragraph dark-purple-text">{description}</p> */}

              <p>Steps</p>
              <div className="steps-container">
                {/* {steps.map((s, index) => {
                  return (
                    <div key={index + 1} className="step-box">
                      <p className="step-number">{index + 1}</p>
                      <p className="step-instruction">{s}</p>
                    </div>
                  );
                })} */}
              </div>
            </div>
          </div>

          {/* <div className="students-container">
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
          </div> */}
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
