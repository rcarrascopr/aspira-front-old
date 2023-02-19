import React from "react";
import { Paper, Grid } from "@material-ui/core";
import ProgressBar from "../../commons/ProgressBar";

function SemesterSummaryCard(props) {
  const { courses } = props;

  const getProductsPassed = () => {
    let count = 0;
    courses.forEach((course) => {
      count += course.products_passed;
    });
    return count;
  };

  const getProductsAmount = () => {
    let count = 0;
    courses.forEach((course) => {
      count += course.amount_of_products;
    });
    return count;
  };

  const getTotalStudents = () => {
    let students = [];
    courses.forEach((course) => {
      course.students.forEach((student) => {
        if (!students.some((s) => s.id === student.id)) {
          students.push(student);
        }
      });
    });
    return students.length;
  };

  const getTotalPlans = () => {
    let count = 0;
    courses.forEach((course) => {
      count += course.plans.length;
    });
    return count;
  };

  return (
    <Paper className="dashboard-2-card" elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <p
            className="medium-title dark-purple-text"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Resumen del Semestre
          </p>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className="semester-summary-subcard">
            <p className="dark-purple-text">Productos Asignados</p>
            <p className="dark-purple-text big-numbers-text">
              {getProductsAmount()}
            </p>
            <ProgressBar
              successPercentage={Math.round(
                (getProductsPassed() / getProductsAmount()) * 100
              )}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} className="semester-summary-subcard">
            <p className="dark-purple-text">Total de Estudiantes</p>
            <p className="dark-purple-text big-numbers-text">
              {getTotalStudents()}
            </p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className="semester-summary-subcard">
            <p className="dark-purple-text"> Total de UTIS</p>
            <p className="dark-purple-text big-numbers-text">
              {getTotalPlans()}
            </p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} className="semester-summary-subcard">
            <p className="dark-purple-text">Total de Cursos</p>
            <p className="dark-purple-text big-numbers-text">
              {courses.length}
            </p>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SemesterSummaryCard;
