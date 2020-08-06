import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction } from "../../../actions/userActions";
import { withRouter } from "react-router-dom";

import Error from "../../../commons/inputs/Error";
import { TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

import "./signin.css";

const Signin = (props) => {
  const { control, errors, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data, event) => {
    props.login({ user: data }).then(() => {
      if (localStorage.getItem("token")) {
        props.history.push("/");
      }
    });
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card very-light-purple">
        <div className="signin-image-wrapper">
          <div className="signin-image-layer" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="signin-content">
          <img
            className="signin-logo"
            src="/assets/logo_aspira.png"
            alt="Logo Aspira"
          />

          <div className="textfield-input" style={{ width: "60%" }}>
            <Controller
              as={
                <TextField
                  id="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  className={"dark-purple-text textfield-outlined"}
                  error={errors["email"]}
                  type={"email"}
                />
              }
              // onChange={handleChange}
              name={"email"}
              control={control}
              rules={{ required: true }}
            />
            <Error errors={errors["email"]} />
          </div>
          <div className="textfield-input" style={{ width: "60%" }}>
            <Controller
              as={
                <TextField
                  id="password"
                  label="Contraseña"
                  variant="outlined"
                  className={"dark-purple-text textfield-outlined"}
                  error={errors["password"]}
                  type={"password"}
                />
              }
              // onChange={handleChange}
              name={"password"}
              control={control}
              rules={{ required: true }}
            />
            <Error errors={errors["password"]} />
          </div>

          <input type="submit" className="primary-btn" value="Acceder"></input>
        </form>
      </div>
      <p className="dark-purple-text">
        {" "}
        Todos los derechos reservados - Aspira de Puerto Rico
      </p>
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
