import React from "react";
import { NameCircle } from "../NameCircle";

export const PersonListItem = (props) => {
  return (
    <li
      key={props.item.id}
      className={`list-item ${props.handleClick ? "pointer" : ""}`}
      onClick={(event) => props.handleClick(event, props.item)}
    >
      <div className="list-item-content">
        <NameCircle
          size="small"
          initials={props.item.first_name[0] + props.item.paternal_surname[0]}
        />
        <p className="dark-purple-text">{`${props.item.first_name} ${
          props.item.paternal_surname ? props.item.paternal_surname : ""
        } ${
          props.item.maternal_surname ? props.item.maternal_surname : ""
        }`}</p>
      </div>
    </li>
  );
};
