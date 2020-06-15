import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./commons/PrivateRoute";
import Navbar from "./features/nav/Navbar.js";
import Signin from "./features/user/sign in/Signin";
import CenterContainer from "./features/centers/CenterContainer";
import { DashboardContainer } from "./features/dashboard/DashboardContainer";
import UTISContainer from "./features/UTIS/UTISContainer";
import UTISFormContainer from "./features/UTIS/form/UTISFormContainer2";
import { StudentsContainer } from "./features/students/StudentsContainer";
import UserForm from "./features/user/form/UserForm";
import UTISShowContainer from "./features/UTIS/show page/UTISShowContainer";
import EventsContainer from "./features/events/EventsContainer";
import ProductFormContainer from "./features/products/form/ProductFormContainer";

import Product from "./features/products/Product";
import RoutesWithSubRoutes from "./commons/RoutesWithSubRoutes";

function App(props) {
  // useEffect(() => {
  //   if (props.currentUser && props.currentUser.role === "Admin") {
  //     props.fetch_centers();
  //   }
  // }, [props, props.currentUser]);

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

  const routes = [
    // {
    //   path: "/",
    //   component: DashboardContainer,
    // },
    // {
    //   path: "/login",
    //   component: Signin,
    // },
    {
      path: "/centers",
      component: CenterContainer,
    },
    {
      path: "/utis",
      component: UTISContainer,
      routes: [
        {
          path: "/create",
          component: UTISFormContainer,
        },
        {
          path: "/:id",
          component: UTISShowContainer,
        },
      ],
    },
  ];

  return (
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" render={() => <DashboardContainer />} />
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
          <PrivateRoute path="/utis/:id" component={UTISShowContainer} />
          <PrivateRoute path="/utis" component={UTISContainer} />
          <PrivateRoute path="/:estudiantes/create" component={UserForm} />
          <PrivateRoute path="/estudiantes" component={StudentsContainer} />
          <PrivateRoute path="/eventos" component={EventsContainer} />

          {/* <Route path="/:estudiantes/create" component={UserForm} />
          <Route path="/estudiantes" component={StudentsContainer} />
          <Route path="/eventos" component={EventsContainer} />
 */}
          {generateLoginSignupRoutes()}
          {routes.map((route, index) => (
            <RoutesWithSubRoutes key={index} {...route} />
          ))}
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

// let mapDispatchToProps = (dispatch) => {
//   return { fetch_centers: () => dispatch(fetchCenters()) };
// };

export default connect(mapStateToProps)(App);
