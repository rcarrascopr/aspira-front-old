import React from "react";
import { PersonListItem } from "./PersonListItem";

export const PersonListContainer = (props) => {
  const generateItems = () => {
    return props.items.map((item) => (
      <PersonListItem item={item} handleClick={handleClick} />
    ));
  };

  const handleClick = (event, item) => {
    event.preventDefault();
    if (props.selectItem && item) {
      props.selectItem(item);
    }
  };

  return <ul className="student-list scrollable">{generateItems()}</ul>;
};
