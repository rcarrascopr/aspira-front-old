import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  customProps,
  ...rest
}) => {
  const isLoggedIn = localStorage.getItem("token");
  const renderWithCustomProps = (props) => {
    return customProps ? (
      <Component {...props} {...customProps} />
    ) : (
      <Component {...props} />
    );
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          // <Component {...props} />
          renderWithCustomProps(props)
        ) : (
          <>
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          </>
        )
      }
    />
  );
};
