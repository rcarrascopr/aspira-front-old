import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { PrivateRoute } from "./commons/PrivateRoute";
import Navbar from "./features/nav/Navbar.js";
import Signin from "./features/user/sign in/Signin";
import CenterContainer from "./features/centers/CenterContainer";
import { DashboardContainer } from "./features/dashboard/DashboardContainer";
import UTISContainer from "./features/UTIS/UTISContainer";
import UTISFormContainer from "./features/UTIS/form/UTISFormContainer";
import StudentsContainer from "./features/students/StudentsContainer";
import FacultyContainer from "./features/faculty/FacultyContainer";
import UserForm from "./features/user/form/UserForm";
import EmailPasswordForm from "./features/user/form/EmailPasswordForm";
import UTISShowContainer from "./features/UTIS/show page/UTISShowContainer";
import EventsContainer from "./features/events/EventsContainer";
import ProductFormContainer from "./features/products/form/ProductFormContainer";

import Product from "./features/products/Product";
import AdminContainer from "./features/admin/AdminContainer";

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
          <Route path="/" render={() => <Redirect to="/login" />} />
        </React.Fragment>
      );
    }
  };

  return (
    <div className="App">
      {props.currentUser && <Navbar />}

      <div style={{position: "fixed", height: "100%", width: "100%"}}>
        <Switch>
          {generateLoginSignupRoutes()}
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
          <PrivateRoute path="/utis/:id/edit" component={UTISFormContainer} />
          <PrivateRoute path="/utis/:id" component={UTISShowContainer} />
          <PrivateRoute path="/utis" component={UTISContainer} />
          <PrivateRoute path="/:estudiantes/create" component={UserForm} />
          <PrivateRoute path="/estudiantes" component={StudentsContainer} />
          <PrivateRoute path="/:facultad/create" component={UserForm} />
          <PrivateRoute path="/facultad" component={FacultyContainer} />
          <PrivateRoute path="/eventos" component={EventsContainer} />

          <PrivateRoute exact path="/admin" component={AdminContainer} />
          <PrivateRoute
            exact
            path="/users/email-password"
            component={EmailPasswordForm}
          />
          <PrivateRoute
            path="/users/:id/edit"
            component={UserForm}
            customProps={{ isEdit: true }}
            // render={(props) => <UserForm {...props} isEdit={true} />}
          />
          <PrivateRoute path="/users/create" component={UserForm} />

          {/* <Route path="/:estudiantes/create" component={UserForm} />
          <Route path="/estudiantes" component={StudentsContainer} />
          <Route path="/eventos" component={EventsContainer} />
 */}
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

export default withRouter(connect(mapStateToProps)(App));
