import React, { useState, useEffect } from "react";

import { NameCircle } from "../../commons/NameCircle";
import SelectInput from "../../commons/inputs/SelectInput";

import { fetchSemesters } from "../../actions/semesterActions";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

const SecondaryNav = (props) => {
  // const [semester, setSemester] = useState("2015-16 01");

  // const handleChange = (event) => {
  //   setSemester(event.target.value);
  // };

  useEffect(() => {
    props.fetchSemesters();
  }, []);

  return (
    <section className="secondary-nav very-light-purple white-text">
      <div className="nav-header">
        {/* <img src="" alt="Profile image" /> */}
        <NameCircle
          initials={`${props.currentUser.name[0]}${
            props.currentUser.name.split(" ")[1][0]
          }`}
        />

        <div className="name-header">
          <h2>{props.currentUser.name}</h2>
          <Link to="/" className="white-text">
            Ver mi perfil
          </Link>
        </div>
      </div>

      <SelectInput
        name="semester"
        label="Semestre"
        // value={semester}
        labelWidth={70}
        items={props.semesters}
        // handleChange={handleChange}
      />
    </section>
  );
};

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    semesters: state.semesters.semesters,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchSemesters: () => dispatch(fetchSemesters()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryNav);
