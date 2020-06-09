import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./features/nav/Navbar.js";
import Signin from "./features/user/sign in/Signin";
import CenterContainer from "./features/centers/CenterContainer";
import { DashboardContainer } from "./features/dashboard/DashboardContainer";
import UTISContainer from "./features/UTIS/UTISContainer";
import { UTISFormContainer } from "./features/UTIS/form/UTISFormContainer";
import { StudentsContainer } from "./features/students/StudentsContainer";
import UserForm from "./features/user/form/UserForm";
import UTISShowContainer from "./features/UTIS/show page/UTISShowContainer";
import EventsContainer from "./features/events/EventsContainer";
import ProductForm from "./features/products/form/ProductForm"
import { connect } from "react-redux";
import { PrivateRoute } from "./commons/PrivateRoute";

import { fetchCenters } from "./actions/centerActions";

function App(props) {
  useEffect(() => {
    if (props.currentUser && props.currentUser.role === "Admin") {
      props.fetch_centers();
    }
  }, [props.currentUser]);

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
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" render={() => <DashboardContainer />} />
          <PrivateRoute path="/centers" component={CenterContainer} />
          <PrivateRoute path="/utis/products/create" component={ProductForm}/>
          <PrivateRoute path="/utis/:id" component={UTISShowContainer} />
          <PrivateRoute path="/utis/create" component={UTISFormContainer} />
          <PrivateRoute path="/utis" component={UTISContainer} />
          <PrivateRoute path="/:estudiantes/create" component={UserForm} />
          <PrivateRoute path="/estudiantes" component={StudentsContainer} />
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
