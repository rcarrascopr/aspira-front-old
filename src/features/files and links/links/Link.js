import React from "react";

export default function Link(props) {
  return (
    <div className="link-item">
      <div className="file-icon">
        <img src="/assets/link_icon_white.png" alt="" />
      </div>
      <div className="link-item-content">
        <p className="dark-purple-text link-text">
          <a href={props.link.url} target="_blank" rel="noopener noreferrer">
            {props.link.text}
          </a>
        </p>
        <div>
          <img
            className="course-icon"
            src="/assets/edit_icon.png"
            alt="Edit Product"
            onClick={() => props.generateModal(props.link.id)}
            style={{ height: "23px", padding: "0px 10px" }}
          />
          <img
            className="course-icon"
            src="/assets/trash_icon.png"
            alt="Delete Product"
            onClick={() => props.generateDeleteModal(props.link.id)}
            style={{ height: "23px", padding: "0px 10px" }}
          />
        </div>
      </div>
    </div>
  );
}
