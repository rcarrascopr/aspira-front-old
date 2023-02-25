import React, { useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import CourseCard from "../../commons/courses card/CourseCard";
import { withRouter } from "react-router-dom";
import { ChevronRight24Filled } from "@fluentui/react-icons";

function DashboardCardsContainer(props) {
  const { courses, history } = props;

  const [elevation, setElevation] = useState(3);

  const handleClick = () => {
    history.push(`/cursos`);
  };

  const generateCourseCards = () => {
    return courses.slice(0, 2).map((c) => {
      return (
        <Grid item xs={12} sm={6} md={4} id={c.id}>
          <CourseCard
            id={c.id}
            category={c.category}
            name={c.name}
            total_students={c.total_students}
            instructor={c.instructor}
            academic_level={c.academic_level}
          />
        </Grid>
      );
    });
  };
  return (
    <Grid container spacing={2}>
      {generateCourseCards()}

      {courses.length > 2 && (
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            className="course-card-2 pointer bg-purple"
            elevation={elevation}
            onMouseEnter={() => setElevation(8)}
            onMouseLeave={() => setElevation(3)}
            onClick={() => handleClick()}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                className="white-text medium-title"
                style={{ display: "flex", alignItems: "center" }}
              >
                Ver todos los cursos <ChevronRight24Filled style={{marginLeft: "16px"}} />
              </p>
            </div>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default withRouter(DashboardCardsContainer);
