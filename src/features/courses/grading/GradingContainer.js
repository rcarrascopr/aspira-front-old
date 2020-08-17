import React, { useEffect, useState } from "react";

import { SelectInput } from "../../../commons/inputs/SelectInput";
import { fetchOneCourse } from "../../../actions/courseActions";
import { fetchUTIS } from "../../../actions/UTISActions";
import GradesTable from "./GradesTable";

import { connect } from "react-redux";

import "./gradingContainer.css";

function GradingContainer(props) {
  const [selectedUTIS, setSelectedUTIS] = useState("");

  useEffect(() => {
    let id = props.match.params.id;
    if (id) {
      props.fetchCourse(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (selectedUTIS.id) {
      props.fetchUTIS(selectedUTIS.id);
    }
  }, [selectedUTIS]);

  const handleChange = (event) => {
    let utis;
    if (event.target.value === "Todos") {
      utis = "Todos";
    } else {
      utis = props.currentCourse.plans.find((c) => c.id === event.target.value);
    }

    // console.log("Center selected: ", selectedCenter);
    setSelectedUTIS(utis);
  };

  const generateSelectInput = () => {
    let utisList = props.currentCourse.plans;
    return (
      <SelectInput
        name="utis"
        label="UTIS"
        invert={true}
        labelWidth={50}
        items={utisList ? utisList : []}
        handleChange={handleChange}
        value={selectedUTIS.id ? selectedUTIS.id : ""}
      />
    );
  };

  return (
    <div className="grading-container">
      <div className="grading-container-header">
        <div>
          <h1 className="dark-purple-text">
            Calificaciones de productos por UTIS
          </h1>
        </div>
        {generateSelectInput()}
      </div>
      <GradesTable
        utis={props.currentUTIS}
        students={
          props.currentCourse.students ? props.currentCourse.students : []
        }
        tableTitle={props.currentCourse.name}
      />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    currentUTIS: state.utis.currentUTIS,
    currentCourse: state.courses.currentCourse,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: (courseId) => dispatch(fetchOneCourse(courseId)),
    fetchUTIS: (utisId) => dispatch(fetchUTIS(utisId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GradingContainer);
