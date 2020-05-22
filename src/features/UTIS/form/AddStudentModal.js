import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import SelectInput from "../../../commons/inputs/SelectInput";
import { NameCircle } from "../../../commons/NameCircle";

import grades from "../../../commons/grades";
import fake_students from "../../../commons/fake_students";
import { name, last_name } from "../../../commons/sort_methods";

export const AddStudentModal = (props) => {
  const [formData, setFormData] = useState({
    grade: "",
    sortBy: "Nombre",
    filter: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const addStudent = (event, student) => {
    if (!props.utis.students.find((s) => s.id === student.id)) {
      props.setUtis({
        ...props.utis,
        students: [...props.utis.students, student],
      });
    }
  };

  const generateStudents = () => {
    let sorted_students;

    if (formData.filter !== "") {
      sorted_students = fake_students.filter((s) =>
        `${s.first_name} ${s.paternal_surname} ${s.maternal_surname}`.toLowerCase().includes(
          formData.filter.toLowerCase()
        )
      );
    } else {
      sorted_students = fake_students;
    }

    if (formData.sortBy === "Apellido") {
      sorted_students = sorted_students.sort(last_name);
    } else {
      sorted_students = sorted_students.sort(name);
    }

    return sorted_students.map((student) => (
      <li key={student.id} className="student-list-item">
        {" "}
        <div>
          <NameCircle
            size="small"
            initials={student.first_name[0] + student.paternal_surname[0]}
          />
          <p className="dark-purple-text">{`${student.first_name} ${student.paternal_surname} ${student.maternal_surname}`}</p>
        </div>
        {props.utis.students.find((s) => s.id === student.id) ? (
          <p className="icon">✔️</p>
        ) : (
          <p className="icon">
            <img
              src="/assets/add_icon.png"
              alt="Add icon"
              onClick={(event) => addStudent(event, student)}
            />
          </p>
        )}
      </li>
    ));
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        className="dark-purple-text text-align-center
      "
      >
        Añadir estudiantes
        <hr />
      </DialogTitle>

      <DialogContent className="modal">
        <SelectInput
          name="sortBy"
          label="Ordernar por"
          invert={true}
          value={formData.sortBy}
          labelWidth={90}
          items={["Nombre", "Apellido"]}
          handleChange={handleChange}
        />
        <SelectInput
          name="grade"
          label="Grado"
          invert={true}
          value={formData.grade}
          labelWidth={70}
          items={grades}
          handleChange={handleChange}
        
        />

        <div className="search-form">
          <input
            className="search"
            type="search"
            name="filter"
            onChange={handleChange}
          />
          <img
            className="dark-purple search-image"
            src="/assets/search_icon.png"
          />
        </div>
        <ul className="student-list  scrollable">{generateStudents()}</ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Volver
        </Button>
      </DialogActions>
    </Dialog>
  );
};
