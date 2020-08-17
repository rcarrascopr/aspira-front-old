import React from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function GradesTableBody(props) {
  const generateRows = () => {
    return props.students.map((student) => {
      return (
        <TableRow>
          <TableCell align="center">{student.studentName}</TableCell>

          {generateProductInfo(student.productGrades)}
        </TableRow>
      );
    });
  };

  const generateProductInfo = (productGrades) => {
    if (productGrades) {
      return productGrades.map((productGrade) => (
        <>
          <TableCell align="center" className="cell-border-left">
            {productGrade.submitted ? "Entregado" : "Pendiente"}
          </TableCell>
          {generateGrades(productGrade.levels)}
        </>
      ));
    }
  };

  const generateGrades = (levels) => {
    if (levels) {
      return levels.map((level) => (
        <TableCell align="center" className="cell-border-left">
          {level.grade}/1
        </TableCell>
      ));
    }
  };

  return (
    <TableBody>
      {/* <TableRow>{props.data[0] ? props.data[0].first_name : ""}</TableRow> */}
      {generateRows()}
    </TableBody>
  );
}
