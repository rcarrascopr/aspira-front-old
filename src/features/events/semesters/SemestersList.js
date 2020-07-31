import React, { useState } from "react";

import Semester from "./Semester";

export default function SemestersList(props) {
  const generateSemesters = () => {
    let semestersInOrder = props.semesters.sort((a, b) =>
      ("" + a.name).localeCompare(b.name)
    );

    return semestersInOrder.map((semester) => {
      return (
        <Semester
          semester={semester}
          setCurrentSemester={props.setCurrentSemester}
        />
      );
    });
  };
  return <ul className="events-list scrollable">{generateSemesters()}</ul>;
}
