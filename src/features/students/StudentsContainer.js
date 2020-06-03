import React, { useState } from "react";

import { StudentList } from "./StudentList";
import StudentDetails from "./StudentDetails";

import "./students.css";

export const StudentsContainer = (props) => {
  const [formData, setFormData] = useState({
    center: "",
    sortBy: "Nombre",
    grade: "",
    filter: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <section className="students-container">
      <StudentList formData={formData} handleChange={handleChange} />
      <StudentDetails />
    </section>
  );
};
