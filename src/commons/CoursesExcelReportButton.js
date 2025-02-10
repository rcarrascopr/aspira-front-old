import React from "react";
import * as XLSX from "xlsx";
import { fetchCourseSummaryReport } from "../actions/courseActions";
import { connect } from "react-redux";
import { saveAs } from "file-saver";
import { round2 } from "./common_methods";

const CoursesExcelReportButton = (props) => {
  const handleExport = () => {
    props.fetchCourse(props.courseId).then(() => {
      if (!props.currentCourse) return;

      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, "0")}-${String(
        now.getMonth() + 1
      ).padStart(2, "0")}-${now.getFullYear()}`;
  
      // Sanitize course name: remove special characters & replace spaces with underscores
      const sanitizedCourseName = props.currentCourse.name
        .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
  
      const fileName = `Reporte de ${sanitizedCourseName} ${formattedDate}.xlsx`;

      let instructor = props.currentCourse.instructor;
      const wsData = [
        [
          "Centro",
          props.currentCourse.center.name,
          "GPH",
          instructor.first_name +
            " " +
            instructor.paternal_surname +
            " " +
            instructor.maternal_surname,
          "Nombre del Curso",
          props.currentCourse.name,
          "Semestre",
          props.currentCourse.semester.name,
        ], // First row with values
        [], // Empty row
        [
          // Headers
          "Nombre del Estudiante",
          "Productos completados",
          "Total Productos",
          "% de trabajos completados",
          "Evaluación",
          "Ser",
          "Hacer",
          "Convivir",
          "Conocer",
        ],
        ...props.currentCourse.students.map((student) => [
          student.first_name +
            " " +
            student.paternal_surname +
            " " +
            student.maternal_surname,
          student.products_passed,
          student.amount_of_products,
          student.amount_of_products > 0
            ? round2(student.products_passed / student.amount_of_products)
            : 0,
          student.status,
          student.skills.SER.average_level,
          student.skills.HACER.average_level,
          student.skills.CONVIVIR.average_level,
          student.skills.CONOCER.average_level,
        ]),
      ];

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // Auto-calculate column widths
      const colWidths = wsData[0].map((_, colIndex) => ({
        wch:
          Math.max(
            ...wsData.map((row) =>
              row[colIndex] ? row[colIndex].toString().length : 10
            )
          ) + 2,
      }));

      ws["!cols"] = colWidths;

    
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Reporte");

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(data, fileName);
    });
  };

  return (
    <img
      className="icon pointer"
      src="/assets/download-icon.png"
      onClick={handleExport}
    ></img>
  );
};

let mapStateToProps = (state) => {
  return {
    currentCourse: state.courses.currentCourse,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    fetchCourse: (courseId) => dispatch(fetchCourseSummaryReport(courseId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesExcelReportButton);
