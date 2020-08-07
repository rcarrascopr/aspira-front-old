import React from "react";

import {Link} from "react-router-dom"

export default function CoursesListItem(props) {
  return (
    <li key={props.item.id} className="list-item">
      <div className="list-item-content">
        <Link className="dark-purple-text" to={`/courses/${props.item.id}`} >
          {props.item.name} - {props.item.category}
        </Link>
      </div>
    </li>
  );
}
