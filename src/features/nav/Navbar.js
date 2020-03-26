import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = props => {
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
    </nav>
  );
};

let mapDispatchToProps = state => {
  return {
    user: state.users.current_user
  };
};

export default connect(mapDispatchToProps)(Navbar);
