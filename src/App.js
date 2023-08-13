import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { PrivateRoute } from "./commons/PrivateRoute";
import Navbar from "./features/nav/Navbar.js";
import Signin from "./features/user/sign in/Signin";
// import CenterContainer from "./features/centers/CenterContainer";
import { DashboardContainer } from "./features/dashboard/DashboardContainer";
import CoursesParentContainer from "./features/courses/CoursesParentContainer";
import CoursesFormContainer from "./features/courses/form/CoursesFormContainer";
import StudentsContainer from "./features/students/StudentsContainer";
import FacultyContainer from "./features/faculty/FacultyContainer";
import UserForm from "./features/user/form/UserForm";
import EmailPasswordForm from "./features/user/form/EmailPasswordForm";
import CoursesShowContainer from "./features/courses/show page/CoursesShowContainer";
import UTISShowContainer from "./features/courses/show page/plans/show page/UTISShowContainer";
import EventsContainer from "./features/events/EventsContainer";
import ProductFormContainer from "./features/products/form/ProductFormContainer";
import GradingContainer from "./features/courses/grading/GradingContainer";
import SubmissionFormContainer from "./features/products/submission form/SubmissionFormContainer";

import ActivityShowContainer from "./features/courses/show page/plans/show page/activities/show page/ActivityShowContainer";
import AdminContainer from "./features/admin/AdminContainer";
import { LoadingScreen } from "./commons/loading/LoadingScreen";
// import DashboardContainer from "./features/dashboard-2/DashboardContainer";
import ReportsContainer from "./features/reports/ReportsContainer";

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
      <LoadingScreen open={props.loading} />
      <div style={{ height: "100%", width: "100%" }}>
        <Switch>
          {generateLoginSignupRoutes()}
          <PrivateRoute exact path="/" component={DashboardContainer} />
          {/* <PrivateRoute
            exact
            path="/dashboard-2"
            component={DashboardContainer2}
          /> */}

          {/* <PrivateRoute path="/centers" component={CenterContainer} /> */}

          <PrivateRoute path="/generar-reportes" component={ReportsContainer} />
          <PrivateRoute
            path="/cursos/create"
            component={CoursesFormContainer}
          />
          <PrivateRoute
            path="/cursos/:id/calificaciones"
            component={GradingContainer}
          />
          <PrivateRoute
            path="/cursos/:id/utis/:utis_id"
            component={UTISShowContainer}
          />
          <PrivateRoute
            path="/actividades/:id/productos/evaluar"
            component={SubmissionFormContainer}
          />
          <PrivateRoute
            path="/actividades/:id/productos/:product_id/edit"
            component={ProductFormContainer}
          />
          <PrivateRoute
            path="/actividades/:id/productos/create"
            component={ProductFormContainer}
          />
          {/* Change component from product to activity */}
          <PrivateRoute
            path="/actividades/:id"
            component={ActivityShowContainer}
          />
          <PrivateRoute
            path="/cursos/:id/edit"
            component={CoursesFormContainer}
          />
          <PrivateRoute path="/cursos/:id" component={CoursesShowContainer} />
          <PrivateRoute path="/cursos" component={CoursesParentContainer} />
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
  let loading = false;

  for (let key in state) {
    if (state[key].loading) {
      loading = true;
      break;
    }
  }

  return {
    currentUser: state.users.currentUser,
    loading: loading,
  };
};

// let mapDispatchToProps = (dispatch) => {
//   return { fetch_centers: () => dispatch(fetchCenters()) };
// };

export default withRouter(connect(mapStateToProps)(App));
