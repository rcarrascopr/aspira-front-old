import React from "react";

import SelectInput from "../../commons/inputs/SelectInput";
import { PersonListContainer } from "../../commons/person list/PersonListContainer";
import fake_students from "../../commons/fake_students";

import { filterPeople, last_name, name } from "../../commons/sort_methods";

export const StudentList = (props) => {
  const generateStudents = () => {
    let sorted_students;

    if (props.formData.filter !== "") {
      sorted_students = fake_students.filter(
        filterPeople,
        props.formData.filter
      );
    } else {
      sorted_students = fake_students;
    }

    if (props.formData.sortBy === "Apellido") {
      sorted_students = sorted_students.sort(last_name);
    } else {
      sorted_students = sorted_students.sort(name);
    }

    return <PersonListContainer items={sorted_students} />;
  };

  return (
    <div className="student-list-container">
      <div className="header">
        <div className="header-with-icon">
          <img src="/assets/user_icon.png" alt="" />
          <h1>Estudiantes</h1>
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
          items={["Aguada", "Moca", "Mayaguez", "Carolina"]}
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
          items={["10mo"]}
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
      </div>
    </div>
  );
};
