import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import ProgressBar from "../../commons/ProgressBar";
import { withRouter } from "react-router-dom";

function ProductSubmittedPercentageSubcard(props) {
  const {
    id,
    activityName,
    productTitle,
    products_passed,
    amount_of_products,
    history,
  } = props;

  const [elevation, setElevation] = useState(3);

  const handleClick = (id) => {
    history.push(`/actividades/${id}`);
  };

  return (
    <Paper
      className="product-submitted-percentage-subcard pointer"
      elevation={elevation}
      onMouseEnter={() => setElevation(8)}
      onMouseLeave={() => setElevation(3)}
      id={id}
      onClick={() => handleClick(id)}
    >
      <p className="dark-purple-text" style={{ width: "60%" }}>
        {activityName}: {productTitle}
      </p>
      {amount_of_products > 0 && (
        <div style={{ width: "30%" }}>
          <ProgressBar
            successPercentage={Math.round(
              (products_passed / amount_of_products) * 100
            )}
          />
        </div>
      )}
    </Paper>
  );
}

export default withRouter(ProductSubmittedPercentageSubcard);
