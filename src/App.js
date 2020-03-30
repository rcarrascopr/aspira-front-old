import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./features/nav/Navbar.js";
import Signin from "./features/user/sign in/Signin";
import CenterContainer from "./features/centers/CenterContainer";
import { connect } from "react-redux";
import { PrivateRoute } from "./commons/PrivateRoute";

function App(props) {
  const generateLoginSignupRoutes = () => {
    if (!props.currentUser) {
      return (
        <React.Fragment>
          <Route exact path="/login" render={props => <Signin {...props} />} />
        </React.Fragment>
      );
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" render={() => <p>Hi</p>} />
          <PrivateRoute path="/centers" component={CenterContainer} />
          {generateLoginSignupRoutes()}
        </Switch>
      </div>
    </div>
  );
}

let mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  };
};

export default connect(mapStateToProps)(App);
