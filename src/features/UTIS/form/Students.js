import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";
import Error from "../../../commons/inputs/Error";
import { AddStudentModal } from "./AddStudentModal";
import { NameCircle } from "../../../commons/NameCircle";

export const Students = (props) => {
  const {
    control,
    errors,
    reset,
    centerWithStudents,
    students,
    selectedStudents,
    setSelectedStudents,
    utisFormData,
    setUTISFormData,
  } = useFormContext();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeStudent = (event, indexOfStudent) => {
    /**
     fed the index of the current student selected from click event
     setSelectedStudents will copy existing state, find the given index,
     then remove 1 element from it.
     Intends to remove current Student from selectedStudentsArray
    */
    const newState = [...selectedStudents];
    newState.splice(indexOfStudent, 1);
    setSelectedStudents(newState);
  };

  useEffect(() => {
    setUTISFormData({ ...utisFormData, students: selectedStudents });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudents]);

  const generateStudents = () => {
    return selectedStudents.map((student) => (
      <li key={student.id} className="student-list-item">
        {" "}
        <div>
          <NameCircle
            size="small"
            initials={student.first_name[0] + student.paternal_surname[0]}
          />
          <p className="dark-purple-text">{`${student.first_name} ${student.paternal_surname} ${student.maternal_surname}`}</p>
        </div>
        <p className="trash-icon">
          <img
            src="/assets/trash_icon.png"
            alt="Remove icon"
            onClick={(event) =>
              removeStudent(event, selectedStudents.indexOf(student))
            }
          />
        </p>
      </li>
    ));
  };

  return (
    <div className="utis-students-container students">
      <h1 className="dark-purple-text">UTIS: Estudiantes</h1>
      {!!centerWithStudents ? (
        <div className="utis-students-header">
          <p className="dark-purple-text">Lista de estudiantes matriculados</p>
          <a onClick={handleClickOpen}>+ Añadir a lista</a>
          <AddStudentModal open={open} handleClose={handleClose} />
        </div>
      ) : (
        <>
          <p>Loading Students...</p>
          <p>Please make sure you have selected a Center.</p>
        </>
      )}
      <ul className="student-list scrollable">{generateStudents()}</ul>
    </div>
  );
};
