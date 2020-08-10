import React from "react";

import { PersonListContainer } from "../../../../../commons/person list/PersonListContainer";

export default function StudentListCard() {
  return (
    <div className="card">
      <h3 className="dark-purple-text">Estudiantes en el curso</h3>
      <PersonListContainer items={[]} />
    </div>
  );
}
