import React, { useEffect } from "react";

import { connect } from "react-redux";
import { fetchActivity } from "../../../actions/activityActions";

import Accordions from "./Accordions";

import "./submissionForm.css";

const SubmissionFormContainer = (props) => {
  useEffect(() => {
    props.fetchActivity(props.match.params.id);
  }, []);

  const renderContent = () => {
    if (props.currentActivity.id) {
      return (
        <div>
          <h2 className="dark-purple-text">
            {props.currentActivity.product.title}
          </h2>
          <p className="dark-purple-text sub-header-text">
            {props.currentActivity.name}
          </p>
          <hr />
          <div className="submission-content">
            <h1 className="dark-purple-text">
              Detalles de entrega de producto
            </h1>
            <Accordions students={props.currentActivity.product.students} />
          </div>
        </div>
      );
    }
  };

  return (
    <section className="submission-form-container courses-purple">
      {renderContent()}
    </section>
  );
};

let mapStateToProps = (state) => {
  return { currentActivity: state.activities.currentActivity };
};

let mapDispatchToProps = (dispatch) => {
  return { fetchActivity: (id) => dispatch(fetchActivity(id)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmissionFormContainer);
