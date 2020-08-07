import React from "react";

import SelectInput from "../../commons/inputs/SelectInput";
import { PersonListContainer } from "../../commons/person list/PersonListContainer";
// import fake_students from "../../commons/fake_students";

import { facultyTitles } from "../../commons/data/titles";
import centers from "../../commons/data/centers";

import { filterPeople, last_name, name } from "../../commons/sort_methods";

export const FacultyList = (props) => {
  const generateFaculty = () => {
    let sorted_faculty;

    if (props.formData.filter !== "") {
      sorted_faculty = props.faculty.filter((faculty) =>
        filterPeople(faculty, props.formData.filter)
      );
    } else {
      sorted_faculty = props.faculty;
    }

    if (props.formData.title !== "Todos") {
      sorted_faculty = sorted_faculty.filter(
        (faculty) => faculty.role == props.formData.title
      );
    }

    if (props.formData.center !== "Todos") {
      sorted_faculty = sorted_faculty.filter(
        (faculty) => faculty.center.id == props.formData.center
      );
    }

    if (props.formData.sortBy === "Apellido") {
      sorted_faculty = sorted_faculty.sort(last_name);
    } else {
      sorted_faculty = sorted_faculty.sort(name);
    }

    return (
      <PersonListContainer
        items={sorted_faculty}
        selectItem={props.setCurrentFaculty}
      />
    );
  };

  return (
    <div className="student-list-container">
      <div className="header">
        <div className="header-with-icon">
          <img src="/assets/user_icon.png" alt="" />
          <h1 className="dark-purple-text">Facultad</h1>
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
          name="title"
          label="Título"
          invert={true}
          value={props.formData.grade}
          labelWidth={50}
          items={["Todos", ...facultyTitles]}
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
        {generateFaculty()}
      </div>
    </div>
  );
};
