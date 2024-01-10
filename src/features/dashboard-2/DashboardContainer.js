import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./dashboard.css";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import SemesterSummaryCard from "./SemesterSummaryCard";
import DashboardCourseCard from "./DashboardCourseCard";
import { fetchDashboardCourses } from "../../actions/dashboardActions";
import * as moment from "moment/min/moment-with-locales";
import DashboardCardsContainer from "./DashboardCardsContainer";
import MainWrapper from "../../commons/MainWrapper";
import ToggleButton from "../../commons/inputs/ToggleButton/ToggleButton";

const DashboardContainer = (props) => {
  const { dashboardCourses, fetchCourses, currentSelectedSemester } = props;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    setCourses(
      dashboardCourses.filter(
        (c) =>
          currentSelectedSemester && c.semester_id == currentSelectedSemester.id
      )
    );
  }, [dashboardCourses, currentSelectedSemester]);

  const generateCourseCards = () => {
    return courses.map((c) => {
      return (
        <Grid item xs={12} id={c.id}>
          <DashboardCourseCard {...c} />
        </Grid>
      );
    });
  };

  const daysUntilSemesterOver = () => {
    if (currentSelectedSemester) {
      return moment(currentSelectedSemester.end_date).diff(moment(), "days");
    }
    return 0;
  };

  return (
    <MainWrapper>
      <div className="dashboard-2 ">
        <div className="reports-header" style={{ paddingBottom: "24px" }}>
          <h1>Dashboard</h1>
          {props.currentUser && props.currentUser.role === "Admin" && (
            <ToggleButton
              onToggle={() => props.updateDashboardState("reports")}
              selectedOption="dashboard"
            />
          )}
        </div>
        {courses.length > 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCardsContainer courses={courses} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container spacing={2}>
                {generateCourseCards()}
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Grid container spacing={2}>
                {daysUntilSemesterOver() < 150 &&
                  daysUntilSemesterOver() > 0 && (
                    <Grid item xs={12}>
                      <Paper className="dashboard-2-card" elevation={3}>
                        <div className="numbers-countdown big-numbers-text">
                          <p className="dark-purple-text">
                            {daysUntilSemesterOver()}
                          </p>
                          <p className="dark-purple-text">😎</p>
                        </div>
                        <p className="dark-purple-text">
                          días para el final de semestre
                        </p>
                      </Paper>
                    </Grid>
                  )}

                <Grid item xs={12}>
                  <SemesterSummaryCard courses={courses} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {courses.length === 0 && (
          <p className="dark-purple-text">
            Ningún curso asignado en este semestre. Selecciona otro semestre.
          </p>
        )}
      </div>
    </MainWrapper>
  );
};

const mapStateToProps = (state) => ({
  dashboardCourses: state.dashboard.courses,
  currentSelectedSemester: state.semesters.currentSelectedSemester,
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourses: () => dispatch(fetchDashboardCourses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
