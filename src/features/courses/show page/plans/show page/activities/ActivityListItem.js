import React from "react";

import { withRouter } from "react-router-dom";

function ActivityListItem(props) {
  const handleClick = () => {
    props.history.push(`/actividades/${props.id}/productos/create`);
  };

  const generateProductContent = () => {
    let content;
    if (props.product && props.product.id) {
      content = (
        <>
          <p className="dark-purple-text">Producto: </p>
          <div className="activity-list-item-product">
            <div className="file-icon">
              <img src="/assets/file_icon_white.png" alt="" />
            </div>
            <p
              className="dark-purple-text"
              style={{ width: "400px", margin: "0px" }}
            >
              {props.product.title}
            </p>
            {(props.currentUser.role === "Admin" ||
              props.currentUser.role === "Teacher") && (
              <>
                <img
                  className="course-icon"
                  src="/assets/edit_icon.png"
                  alt="Edit Product"
                  onClick={() => {
                    props.history.push(
                      `/actividades/${props.id}/productos/${props.product.id}/edit`
                    );
                  }}
                  style={{ height: "23px" }}
                />
                <img
                  className="course-icon"
                  src="/assets/trash_icon.png"
                  alt="Delete Product"
                  onClick={() =>
                    props.generateDeleteModal({ productId: props.product.id })
                  }
                  style={{ height: "23px" }}
                />
              </>
            )}
          </div>
        </>
      );
    } else {
      if (
        props.currentUser.role === "Admin" ||
        props.currentUser.role === "Teacher"
      ) {
        content = (
          <>
            <p className="dark-purple-text">Producto: </p>
            <a className="tertiary-btn" onClick={() => handleClick()}>
              + Añadir producto
            </a>
          </>
        );
      }
    }
    return <>{content}</>;
  };

  const handleLinkClick = () => {
    props.history.push(`/actividades/${props.id}`);
  };

  return (
    <div className="activity-list-item">
      <div className="activity-card">
        <h3
          className="activity-card-header dark-purple-text pointer"
          onClick={() => {
            handleLinkClick();
          }}
        >
          {props.name}
        </h3>
        <div className="activity-card-content">
          {generateProductContent()}
          {/* <p className="dark-purple-text">{props.description}</p> */}
          {/* <p>Entregados: {props.students_submitted} </p>
        <p>No Entregados: {props.students_not_submitted}</p> */}
        </div>
      </div>
      {(props.currentUser.role === "Admin" ||
        props.currentUser.role === "Teacher") && (
        <>
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
            onClick={() => props.generateDeleteModal({ activityId: props.id })}
          />
        </>
      )}
    </div>
  );
}

export default withRouter(ActivityListItem);
