import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchActivity } from "../../../../../../../actions/activityActions";

import Product from "../../../../../../products/Product";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";

import FileAndLinkContainer from "../../../../../../files and links/FileAndLinkContainer";
import SubmittedProductsTable from "./SubmittedProductsTable";
import StudentSideBarContainer from "./student side cards/StudentSideBarContainer";

import "./activityShowContainer.css";

const ActivityShowContainer = (props) => {
  const activityId = props.match.params.id;

  useEffect(() => {
    props.fetchActivity(activityId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateProductInformation = () => {
    if (props.currentActivity && props.currentActivity.product) {
      let product = props.currentActivity.product;
      return <Product product={product} currentUser={props.currentUser} />;
    }
  };

  const generateSideCards = () => {
    let role = props.currentUser.role;
    if (role === "Admin" || role === "Teacher") {
      return <SubmittedProductsTable currentActivity={props.currentActivity} />;
    } else {
      let product = props.currentActivity.product;
      if (product && product.has_skills && product.levels.length > 0) {
        return (
          <StudentSideBarContainer
            currentActivity={props.currentActivity}
            currentUser={props.currentUser}
          />
        );
      }
    }
  };

  const generateActivityHeader = () => {
    if (props.currentActivity.id) {
      let activity = props.currentActivity;
      let course = activity.course;
      let plan = activity.plan;
      let instructor = course.instructor;
      return (
        <div className="activity-header dark-purple white-text">
          <p>
            Curso: <strong>{course.name}</strong>
          </p>
          <p>
            UTIS: <strong>{plan.name}</strong>
          </p>
          <p>
            GPH:{" "}
            <strong>{`${instructor.first_name} ${instructor.paternal_surname}`}</strong>
          </p>
        </div>
      );
    }
  };

  const generateBreadcrumbs = () => {
    if (props.currentActivity.id) {
      let activity = props.currentActivity;
      let course = activity.course;
      let plan = activity.plan;
      return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "25px" }}>
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

  const renderActivity = () => {
    if (!!props.currentActivity) {
      return (
        <div className="activity-container">
          <div className="info-wrapper">
            {generateBreadcrumbs()}
            {generateActivityHeader()}
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
          {generateSideCards()}
        </div>
      );
    }
  };

  return <div>{renderActivity()}</div>;
};

const mapStateToProps = (state) => {
  return {
    currentActivity: state.activities.currentActivity,
    currentUser: state.users.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchActivity: (activityId) => dispatch(fetchActivity(activityId)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityShowContainer);
