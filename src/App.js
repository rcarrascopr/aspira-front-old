import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./features/nav/Navbar.js";
import Signin from "./features/user/sign in/Signin";
import CenterContainer from "./features/centers/CenterContainer";
import { DashboardContainer } from "./features/dashboard/DashboardContainer";
import UTISContainer from "./features/UTIS/UTISContainer";
import { UTISFormContainer } from "./features/UTIS/form/UTISFormContainer";
import StudentsContainer from "./features/students/StudentsContainer";
import FacultyContainer from "./features/faculty/FacultyContainer";
import UserForm from "./features/user/form/UserForm";
import UTISShowContainer from "./features/UTIS/show page/UTISShowContainer";
import EventsContainer from "./features/events/EventsContainer";
import ProductFormContainer from "./features/products/form/ProductFormContainer";
import { connect } from "react-redux";
import { PrivateRoute } from "./commons/PrivateRoute";

import { fetchCenters } from "./actions/centerActions";
import Product from "./features/products/Product";

function App(props) {
  useEffect(() => {
    if (props.currentUser && props.currentUser.role === "Admin") {
      props.fetch_centers();
    }
  }, [props, props.currentUser]);

  const generateLoginSignupRoutes = () => {
    if (!props.currentUser) {
      return (
        <React.Fragment>
          <Route
            exact
            path="/login"
            render={(props) => <Signin {...props} />}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <div className="App">
      {props.currentUser && <Navbar />}

      <div>
        <Switch>
          <PrivateRoute exact path="/" component={DashboardContainer} />
          <PrivateRoute path="/centers" component={CenterContainer} />
          <PrivateRoute path="/utis/create" component={UTISFormContainer} />
          <PrivateRoute
            path="/utis/:id/products/create"
            component={ProductFormContainer}
          />
          <PrivateRoute
            path="/utis/:id/products/:productid"
            component={Product}
          />
           <PrivateRoute path="/utis/:id/edit" component={UTISShowContainer} />
          <PrivateRoute path="/utis/:id" component={UTISShowContainer} />
          <PrivateRoute path="/utis" component={UTISContainer} />
          <PrivateRoute path="/:estudiantes/create" component={UserForm} />
          <PrivateRoute path="/estudiantes" component={StudentsContainer} />
          <PrivateRoute path="/:facultad/create" component={UserForm} />
          <PrivateRoute path="/facultad" component={FacultyContainer} />
          <PrivateRoute path="/eventos" component={EventsContainer} />

          {generateLoginSignupRoutes()}
        </Switch>
      </div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return { fetch_centers: () => dispatch(fetchCenters()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
