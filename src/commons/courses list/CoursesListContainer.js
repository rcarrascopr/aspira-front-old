import React from "react";

import CoursesListItem from "./CoursesListItem";

export default function CoursesListContainer() {
  const generateItems = () => {
    return props.items.map((item) => <CoursesListItem item={item} />);
  };

  return <ul className="student-list scrollable">{generateItems()}</ul>;
}
