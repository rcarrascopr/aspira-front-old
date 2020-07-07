import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../../actions/userActions";
import { withRouter } from "react-router-dom";

const Signin = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.login({ user }).then(() => {
      if (localStorage.getItem("token")) {
        props.history.push("/");
      }
    });
  };

  return (
    <div>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          ></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

let mapStateToProps = (state) => {
  return { current_user: state.users.current_user };
};

let mapDispatchToProps = (dispatch) => {
  return {
    login: (formData) => dispatch(loginAction(formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
