import React from "react";
import { Paper, Grid } from "@material-ui/core";
import DashboardUTISCard from "./DashboardUTISCard";
import { Link } from "react-router-dom";

function DashboardCourseCard(props) {
  const { id, plans, name } = props;

  const countPlans = () => {
    let count = 0;

    plans.forEach((plan) => {
      if (plan.activities.length > 0) {
        count += 1;
      }
    });

    return count;
  };

  const generateUTISCards = () => {
    return plans
      .filter((p) => p.activities.length)
      .map((p) => {
        return <DashboardUTISCard id={p.id} {...p} />;
      });
  };

  return (
    <Paper className="dashboard-2-card" elevation={3} id={id}>
      <Link to={`/cursos/${id}`} className="medium-title dark-purple-text">
        {name}
      </Link>

      {generateUTISCards()}

      {countPlans() === 0 && (
        <p className="dark-purple-text" style={{ margin: "12px 0px" }}>
          No hay UTIS con productos asignados.
        </p>
      )}
    </Paper>
  );
}

export default DashboardCourseCard;
