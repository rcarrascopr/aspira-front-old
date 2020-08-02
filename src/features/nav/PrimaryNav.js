import React from "react";
import { NavLink, withRouter } from "react-router-dom";

import { logoutAction } from "../../actions/userActions";

import { connect } from "react-redux";

export const PrimaryNav = (props) => {
  const handleLogout = () => {
    props.logout().then(() => {
      if (!localStorage.getItem("token")) {
        props.history.push("/login");
      }
    });
  };

  return (
    <section className="primary-nav">
      <NavLink className="logo" exact to="/">
        <img src="/assets/logo_aspira.png" alt="Aspira Logo"/>
      </NavLink>

      <NavLink exact className="dark-purple-text" activeClassName="active-link" to="/">
        Dashboard
      </NavLink>
      {!localStorage.getItem("token") && (
        <NavLink exact className="dark-purple-text" activeClassName="active-link" to="/login">
          Sign in
        </NavLink>
      )}

      {localStorage.getItem("token") && (
        <>
          <NavLink exact className="dark-purple-text" activeClassName="active-link" to="/estudiantes">
            Estudiantes
          </NavLink>
          <NavLink exact className="dark-purple-text" activeClassName="active-link" to="/facultad">
            Facultad
          </NavLink>
          <NavLink exact className="dark-purple-text" activeClassName="active-link" to="/utis">
            UTIS
          </NavLink>
          <NavLink exact className="dark-purple-text" activeClassName="active-link" to="/eventos">
            Eventos
          </NavLink>
          <NavLink
            exact
            to="/"
            onClick={handleLogout}
            className="dark-purple white-text logout-btn"
          >
            Salir
          </NavLink>
        </>
      )}
    </section>
  );
};

let mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(PrimaryNav));
