import React from "react";

export default function ActivityListItem(props) {
  return (
    <div className="activity-list-item">
      <div className="product-card">
        <h3 className="product-card-header dark-purple-text">{props.name}</h3>
        <div className="product-card-content">
          {/* <p className="dark-purple-text">{props.description}</p> */}
          {/* <p>Entregados: {props.students_submitted} </p>
        <p>No Entregados: {props.students_not_submitted}</p> */}
        </div>
      </div>
      <img
        className="course-icon"
        src="/assets/edit_icon.png"
        alt="Edit UTIS"
        onClick={() => props.generateModal(props.id)}
      />
      <img
        className="course-icon"
        src="/assets/trash_icon.png"
        alt="Delete UTIS"
        onClick={() => props.generateDeleteModal(props.id)}
      />
    </div>
  );
}
