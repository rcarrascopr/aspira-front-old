import React, { useEffect } from "react";

import { connect } from "react-redux";
import { fetchActivity } from "../../../actions/activityActions";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

import Accordions from "./Accordions";

import "./submissionForm.css";

const SubmissionFormContainer = (props) => {
  const generateBreadcrumbs = () => {
    if (props.currentActivity.id) {
      let activity = props.currentActivity;
      let course = activity.course;
      let plan = activity.plan;
      return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "25px" }}>
          <Link to="/cursos" className="breadcrumb-link">
            Cursos
          </Link>
          <Link to={`/cursos/${course.id}`} className="breadcrumb-link">
            {course.name}
          </Link>
          <Link
            to={`/cursos/${course.id}/utis/${plan.id}`}
            className="breadcrumb-link"
          >
            {plan.name}
          </Link>
          <Link className="breadcrumb-current">{activity.name}</Link>
        </Breadcrumbs>
      );
    }
  };

  useEffect(() => {
    props.fetchActivity(props.match.params.id);
  }, []);

  const renderContent = () => {
    if (props.currentActivity.id) {
      return (
        <div>
          <h1 className="dark-purple-text">
            {props.currentActivity.product.title}
          </h1>

          {generateBreadcrumbs()}
          {/* <p className="dark-purple-text sub-header-text">
            {props.currentActivity.name}
          </p> */}
          <hr />
          <div className="submission-content">
            <h2 className="dark-purple-text" style={{padding: '26px 0px 30px 0px'}}>
              Detalles de entrega de producto
            </h2>
            <Accordions product={props.currentActivity.product} />
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
