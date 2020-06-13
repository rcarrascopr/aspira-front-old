import React from "react";
import { Route } from "react-router-dom";

export default function RoutesWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}
