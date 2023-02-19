import React from "react";
import { Paper, Grid } from "@material-ui/core";
import ProductSubmittedPercentageSubcard from "./ProductSubmittedPercentageSubcard";
import { Link } from "react-router-dom";

function DashboardUTISCard(props) {
  const { courseName, courseId, id, name, activities } = props;

  const generateProductCards = () => {
    return activities.map((a) => {
      return (
        <Grid item xs={12} id={id}>
          <ProductSubmittedPercentageSubcard
            id={a.id}
            activityName={a.name}
            productTitle={a.product.title}
            products_passed={a.product.products_passed}
            amount_of_products={a.product.amount_of_products}
          />
        </Grid>
      );
    });
  };
  return (
    <Paper className="dashboard-2-card" elevation={3} id={id}>
      <Link
        to={`/cursos/${courseId}`}
        className="medium-title dark-purple-text"
      >
        {courseName}
      </Link>
      <div style={{ margin: "12px 0px" }}>
        <Link
          to={`/cursos/${courseId}/utis/${id}`}
          className="dark-purple-text margin-tb-12"
        >
          {name}
        </Link>
      </div>
      <Grid container spacing={2}>
        {generateProductCards()}
      </Grid>
    </Paper>
  );
}

export default DashboardUTISCard;
