import React from "react";

import ActivityList from "./ActivityList";
import StudentCourseGradeCard from "./../../../StudentCourseGradeCard";

import { connect } from "react-redux";

// const products = [
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
//   {
//     name: "Ensayo descriptivo de la fauna en Ciales",
//     students_submitted: 8,
//     students_not_submitted: 1,
//   },
// ];

function ActivityListContainer(props) {
  return (
    <div className="activity-list-container">
      <h1 className="dark-purple-text text-align-center">
        {props.currentUTIS.name}
      </h1>
      <p className="dark-purple-text sub-header-text text-align-center">
        Curso: {props.currentUTIS.course ? props.currentUTIS.course.name : ""}
      </p>
      <hr />
      <div className="activity-list-container-content">
        <ActivityList />
        {props.currentUser.role === "Student" && (
          <div className="course-card-wrapper" style={{ marginTop: "60px" }}>
            <StudentCourseGradeCard
              amount_of_products={props.currentUTIS.amount_of_products}
              products_passed={props.currentUTIS.products_passed}
              status={props.currentUTIS.status}
              evaluationType="UTIS"
            />
          </div>
        )}
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    currentUTIS: state.utis.currentUTIS,
  };
};

export default connect(mapStateToProps)(ActivityListContainer);
