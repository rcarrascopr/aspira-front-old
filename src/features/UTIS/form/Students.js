import React, { useState } from "react";

import { TextField } from "@material-ui/core";

import { AddStudentModal } from "./AddStudentModal";
import { NameCircle } from "../../../commons/NameCircle";

export const Students = ({ handleChange, formData }) => {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const removeStudent = (event, studentId) => {
  //   props.setUtis({
  //     ...props.utis,
  //     students: props.utis.students.filter((s) => s.id !== studentId),
  //   });
  // };

  // const generateStudents = () => {
  //   return props.utis.students.map((student) => (
  //     <li key={student.id} className="student-list-item">
  //       {" "}
  //       <div>
  //         <NameCircle
  //           size="small"
  //           initials={student.first_name[0] + student.paternal_surname[0]}
  //         />
  //         <p className="dark-purple-text">{`${student.first_name} ${student.paternal_surname} ${student.maternal_surname}`}</p>
  //       </div>
  //       <p className="trash-icon">
  //         <img
  //           src="/assets/trash_icon.png"
  //           alt="Remove icon"
  //           onClick={(event) => removeStudent(event, student.id)}
  //         />
  //       </p>
  //     </li>
  //   ));
  // };

  return (
    <div className="utis-students-container">
      <h1>Rendered Students</h1>
      <TextField
        name="studentName"
        label="Student Name"
        variant="outlined"
        className={"dark-purple-text textfield-outlined"}
        defaultValue={formData.studentName}
        onChange={handleChange}
      />
      {/* <h1 className="dark-purple-text">UTIS: Estudiantes</h1>
      <div className="utis-students-header">
        <p className="dark-purple-text">Lista de estudiantes matriculados</p>
        <a onClick={handleClickOpen}>+ Añadir a lista</a>
        <AddStudentModal
          open={open}
          handleClose={handleClose}
          utis={props.utis}
          setUtis={props.setUtis}
        
        />
      </div>
      <ul className="student-list scrollable">{generateStudents()}</ul> */}
    </div>
  );
};
