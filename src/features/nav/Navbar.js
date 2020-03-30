import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../actions/userActions";

const Navbar = props => {
  const handleLogout = () => {
    props.logout().then(() => {
      if (!localStorage.getItem("token")) {
        props.history.push("/");
      }
    });
  };

  return (
    <nav className="navbar">
      <NavLink exact activeClassName="active-link" to="/">
        Home
      </NavLink>
      {/* <NavLink exact activeClassName="active-link" to="/courses">Courses</NavLink>
            <NavLink exact activeClassName="active-link" to="/semesters">Semesters</NavLink>
            <NavLink exact activeClassName="active-link" to="/teachers">Teachers</NavLink>
            <NavLink exact activeClassName="active-link" to="/students">Students</NavLink>
            <NavLink exact activeClassName="active-link" to="/products">Products</NavLink> */}
      {!localStorage.getItem("token") && (
        <NavLink exact activeClassName="active-link" to="/login">
          Sign in
        </NavLink>
      )}

      {localStorage.getItem("token") && (
        <>
          <NavLink exact activeClassName="active-link" to="/centers">
            Centers
          </NavLink>
          <NavLink
            exact
            activeClassName="active-link"
            to="/"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </>
      )}
    </nav>
  );
};

let mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutAction())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Navbar));
