import React, { useContext } from "react";

import { PersonListContainer } from "../../../commons/person list/PersonListContainer";
import CourseContext from "../../../contexts/CourseContext";

export default function StudentListCard() {
  const course = useContext(CourseContext);
  return (
    <div className="card">
      <h3 className="dark-purple-text">Estudiantes en el curso</h3>
      {!!course && <PersonListContainer items={course.students} />}
    </div>
  );
}
