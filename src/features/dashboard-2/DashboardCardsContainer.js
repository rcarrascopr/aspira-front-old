import React from "react";
import { Grid } from "@material-ui/core";
import CourseCard from "../../commons/courses card/CourseCard";

function DashboardCardsContainer(props) {
  const { courses } = props;
  const generateCourseCards = () => {
    return courses.map((c) => {
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
    </Grid>
  );
}

export default DashboardCardsContainer;
