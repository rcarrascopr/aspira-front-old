import React from "react";

import SelectInput from "../../commons/inputs/SelectInput";
import { PersonListContainer } from "../../commons/person list/PersonListContainer";
// import fake_students from "../../commons/fake_students";

import grades from "../../commons/data/grades";
import centers from "../../commons/data/centers";

import { filterPeople, last_name, name } from "../../commons/sort_methods";

export const StudentList = (props) => {
  const generateStudents = () => {
    let sorted_students;

    if (props.formData.filter !== "") {
      sorted_students = props.students.filter((student) =>
        filterPeople(student, props.formData.filter)
      );
    } else {
      sorted_students = props.students;
    }

    if (props.formData.sortBy === "Apellido") {
      sorted_students = sorted_students.sort(last_name);
    } else {
      sorted_students = sorted_students.sort(name);
    }

    if (props.formData.grade !== "Todos") {
      sorted_students = sorted_students.filter(
        (student) => student.academic_level == props.formData.grade
      );
    }

    if (props.formData.center !== "Todos") {
      sorted_students = sorted_students.filter((student) => {
        return student.center.id == props.formData.center;
      });
    }

    return (
      <PersonListContainer
        items={sorted_students}
        selectItem={props.setCurrentStudent}
      />
    );
  };

  return (
    <div className="student-list-container">
      <div className="header">
        <div className="header-with-icon">
          <img src="/assets/user_icon.png" alt="" />
          <h1 className="dark-purple-text">Estudiantes</h1>
        </div>
        <a href="/#/estudiantes/create">
          <img src="/assets/dark_purple_add_icon.png" alt="" /> Crear
        </a>
      </div>
      <hr />

      <div className="student-list-content">
        <SelectInput
          name="center"
          label="Centro"
          invert={true}
          value={props.formData.center}
          labelWidth={50}
          items={["Todos", ...centers]}
          handleChange={props.handleChange}
        />
        <SelectInput
          name="sortBy"
          label="Ordenar Por"
          invert={true}
          value={props.formData.sortBy}
          labelWidth={90}
          items={["Nombre", "Apellido"]}
          handleChange={props.handleChange}
        />
        <SelectInput
          name="grade"
          label="Grado"
          invert={true}
          value={props.formData.grade}
          labelWidth={50}
          items={["Todos", ...grades]}
          handleChange={props.handleChange}
        />
        <div className="search-form">
          <input
            className="search"
            type="search"
            name="filter"
            value={props.formData.filter}
            onChange={props.handleChange}
          />
          <img
            className="dark-purple search-image"
            src="/assets/search_icon.png"
          />
        </div>
        {generateStudents()}
      </div>
    </div>
  );
};
