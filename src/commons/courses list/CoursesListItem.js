import React, { useState, useEffect } from "react";

import { pdf } from "@react-pdf/renderer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveAs } from "file-saver";

import CoursesReport from "../courses report pdf/CoursesReport";
import { fetchCourseReport } from "../../actions/courseActions";

function CoursesListItem(props) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (
      clicked &&
      props.currentCourse &&
      props.currentCourse.id == props.item.id
    ) {
      const doc = (
        <CoursesReport
          course={props.currentCourse}
          student={props.currentStudent}
        />
      );
      const asPdf = pdf([]); // {} is important, throws without an argument
      asPdf.updateContainer(doc);
      asPdf.toBlob().then((blob) => {
        saveAs(blob, `informe-de-evaluacion .pdf`);
      });
      setClicked(false);
    }
  }, [props.currentCourse]);

  const handleGeneratePDF = () => {
    setClicked(true);
    if (!(props.currentCourse && props.currentCourse.id == props.item.id)) {
      props.fetchCourse(props.item.id, props.currentStudent.id);
    }
  };

  return (
    <li key={props.item.id} className="list-item">
      <div
        className="list-item-content"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: (props.userType === "Student" && props.currentStudent && props.currentStudent.id) ? "0px 10px" : "12px 10px"
        }}
      >
        <Link className="dark-purple-text" to={`/cursos/${props.item.id}`}>
          {props.item.name} - {props.item.category}
        </Link>

        {props.userType === "Student" && props.currentStudent && props.currentStudent.id && (
          <p
            onClick={handleGeneratePDF}
            className="tooltip"
            style={{ cursor: "pointer" }}
          >
            <p className="tooltiptext-left">Generar reporte</p>
            <img
              src="/assets/generate_report_icon.png"
              style={{ width: "28px" }}
            />
          </p>
        )}
      </div>
    </li>
  );
}

let mapStateToProps = (state) => {
  return {
    currentCourse: state.courses.currentCourse,
    currentStudent: state.students.currentStudent,
    currentFaculty: state.faculty.currentFaculty,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: (courseId, studentId) =>
      dispatch(fetchCourseReport(courseId, studentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesListItem);
