import React from "react";

import ActivityList from "./ActivityList";

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

export default function ActivityListContainer(props) {
  return (
    <div className="activity-list-container">
      <h1 className="dark-purple-text">{props.currentUTIS.name}</h1>
      <p
        className="dark-purple-text"
        style={{ fontSize: "1.25em", fontWeight: "bold" }}
      >
        Curso: {props.currentUTIS.course ? props.currentUTIS.course.name : ""}
      </p>
      <hr />

      <ActivityList />
    </div>
  );
}
