import React from "react";

export default function CoursesListItem(props) {
  return (
    <li key={props.item.id} className="list-item">
      <div className="list-item-content">
        <a className="dark-purple-text">
          {props.item.name} - {props.item.category}
        </a>
      </div>
    </li>
  );
}
