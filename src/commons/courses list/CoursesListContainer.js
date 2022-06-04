import React from "react";

import CoursesListItem from "./CoursesListItem";

export default function CoursesListContainer(props) {
  const generateItems = () => {
    return props.items.map((item) => <CoursesListItem item={item} userType={props.userType} />);
  };

  return <ul className="student-list scrollable">{generateItems()}</ul>;
}
