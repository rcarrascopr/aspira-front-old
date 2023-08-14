import React, { useState, useEffect } from "react";

import { NameCircle } from "../../commons/NameCircle";
import SelectInput from "../../commons/inputs/SelectInput";

import {
  fetchSemesters,
  updateCurrentSelectedSemester,
} from "../../actions/semesterActions";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SecondaryNav = (props) => {
  // const [semester, setSemester] = useState(props.currentSelectedSemester);

  const handleChange = (event) => {
    let semester_id = event.target.value;
    let currentSemester = props.semesters.find((s) => {
      return s.id === semester_id;
    });
    props.updateCurrentSelectedSemester(currentSemester);
    // setSemester(event.target.value);
  };

  useEffect(() => {
    if (props.semesters.length == 0) {
      props.fetchSemesters();
    }
  }, []);

  useEffect(() => {
    if (
      props.currentSelectedSemester === "" ||
      !props.currentSelectedSemester
    ) {
      let currentSemester = props.semesters.find((s) => {
        return s.name === "2023-24: 1";
      });
      props.updateCurrentSelectedSemester(currentSemester);
    }
  }, [props.semesters]);

  const generateNameCircle = () => {
    return (
      <NameCircle
        initials={`${props.currentUser.name[0]}${
          props.currentUser.name.split(/[ ,]+/)[1][0]
        }`}
      />
    );
  };

  const generateSemesterDropdown = () => {
    // let currentSemester = props.semesters.find((s) => {
    //   return typeof semester === "string"
    //     ? s.name == semester
    //     : s.id === semester;
    // });

    return (
      <SelectInput
        name="semester"
        label="Año escolar"
        value={
          props.currentSelectedSemester ? props.currentSelectedSemester.id : ""
        }
        labelWidth={100}
        items={props.semesters || []}
        handleChange={handleChange}
      />
    );
  };

  return (
    <section className="secondary-nav very-light-purple white-text">
      <div className="nav-header">
        {/* <img src="" alt="Profile image" /> */}

        {generateNameCircle()}

        <div className="name-header">
          <h2>{props.currentUser.name}</h2>
          {/* <Link to="/" className="white-text">
            Ver mi perfil
          </Link> */}
        </div>
      </div>

      {generateSemesterDropdown()}
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    semesters: state.semesters.semesters,
    currentSelectedSemester: state.semesters.currentSelectedSemester,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchSemesters: () => dispatch(fetchSemesters()),
    updateCurrentSelectedSemester: (semester) =>
      dispatch(updateCurrentSelectedSemester(semester)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNav);
