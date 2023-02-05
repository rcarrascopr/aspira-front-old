import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import GradesTableHead from "./GradesTableHead";
import GradesTableBody from "./GradesTableBody";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function GradesTable(props) {
  const classes = useStyles();

  let activities = [];
  let students = [];

  if (props.utis.activities) {
    activities = props.utis.activities.filter(
      (activity) => activity.product && activity.product.id && activity.product.levels.length > 0
    );

    for (let i = 0; activities.length > 0 && i < activities[0].product.students.length; i++) {
      let student = activities[0].product.students[i];
      let studentName = `${student.first_name} ${student.second_name} ${student.paternal_surname} ${student.maternal_surname}`;
      let simpleStudent = { studentName, productGrades: [], id: student.id };
      for (let j = 0; j < activities.length; j++) {
        let levels = activities[j].product.students.find(
          (s) => s.id === simpleStudent.id
        ).levels;
        student = activities[j].product.students[i]
        simpleStudent.productGrades.push({ levels: levels, submitted: student.student_product.submitted });
      }
      students = [...students, simpleStudent];
    }

  }

  const generateTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label={`${props.tableTitle} table`}
        >
          <GradesTableHead activities={activities} />
          <GradesTableBody students={students} />
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="grades-table-card">
      {/* {generateTable()} */}
      {generateTable()}
    </div>
  );
}

// const options = {
//   selectableRows: "none",
//   filter: true,
//   filterType: "dropdown",
//   responsive: "vertical",
//   // sortOrder: {
//   //   name: "Title",
//   //   direction: "asc",
//   // },
//   customRowRender: (data, dataIndex, rowIndex) => {
//     return (
//       <tr key={rowIndex}>
//         {/* <td colSpan={4} style={{ paddingTop: "10px" }}> */}
//           <GradeRow data={data} />
//         {/* </td> */}
//       </tr>
//     );
//   },
// };

// const generateTable = () => {
// if (props.utis.activities) {
//   let activityColumns = [];
//   let activities = props.utis.activities.filter(
//     (activity) => activity.product && activity.product.id
//   );
//   for (let i = 0; i < activities.length; i++) {
//     activityColumns.push({
//       name: `actividad${i}`,
//       label: activities[i].name,
//       options: {
//         filter: true,
//         customHeadRender: (columnMeta, updateDirection) => (
//         //   <th
//         //     key={2}
//         //     onClick={() => updateDirection(2)}
//         //     style={{ cursor: "pointer" }}
//         //   >
//             <GradeColumn {...activities[i]} />
//         //   </th>
//         ),
//         sortThirdClickReset: true,
//         sortDescFirst: true,
//       },
//     });
//   }

//   let columns = [
//     {
//       name: "studentName",
//       // label: "Nombre de Estudiantes",
//       options: {
//         filter: true,
//         customHeadRender: (columnMeta, updateDirection) => (
//             <th
//               key={2}
//               onClick={() => updateDirection(2)}
//               style={{ cursor: "pointer" }}
//               rowSpan={2}
//             >
//             Nombre de Estudiantes
//             </th>
//           ),
//         sortThirdClickReset: true,
//         sortDescFirst: true,
//       },
//     },
//     ...activityColumns,
//   ];

//   let data = [];

//   for (let i = 0; i < activities[0].product.students.length; i++) {
//     let student = activities[0].product.students[i];
//     let studentName = `${student.first_name} ${student.second_name} ${student.paternal_surname} ${student.maternal_surname}`;
//     student = { studentName };
//     for (let j = 0; j < activities.length; j++) {
//       let currentProductStudentData = activities[j].product.students[i];

//       if (student[`actividad${j}`]) {
//         student[`actividad${j}`].levels = [
//           ...student[`actividad${j}`].levels,
//           ...currentProductStudentData.levels,
//         ];
//       } else {
//         student[`actividad${j}`] = {
//           levels: currentProductStudentData.levels,
//           submitted: false,
//         };
//       }
//     }
//     data = [...data, student];
//   }

//     return (
//       <MUIDataTable
//         title={props.tableTitle}
//         data={data}
//         columns={columns}
//         options={options}
//       />
//     );
//   }
// };
