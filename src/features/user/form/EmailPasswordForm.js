import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

function EmailPasswordForm({ currentUser }) {
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const { control, handleSubmit } = useForm();

  const handleClick = (event) => {
    const name = event.target.name;
    if (name === "email") {
      setEmailState(!emailState);
      event.target.innerText = emailState
        ? "Cambiar Correo Electrónico?"
        : "Eliminar Nuevo Correo Electrónico";
    } else if (name === "password") {
      setPasswordState(!passwordState);
      event.target.innerText = passwordState
        ? "Cambiar Contraseña?"
        : "Eliminar Nuevo Contraseña";
    }
  };

  const generateEmailFields = () => {
    if (emailState) {
      return (
        <div className="email-field">
          <p>
            Para cambiar el correo electrónico, proporcione un nuevo correo
            electrónico a continuación:
          </p>
          <Controller
            as={
              <TextField
                id="email"
                label="New Email"
                variant="outlined"
                type="text"
              />
            }
            name={"email-field"}
            control={control}
            rules={{ required: true }}
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const generatePasswordFields = () => {
    if (passwordState) {
      return (
        <div className="password-fields">
          <p>
            Para cambiar la contraseña, ingrese la nueva contraseña a
            continuación:
          </p>
          <Controller
            as={
              <TextField
                id="password"
                label="New Password"
                variant="outlined"
                type="password"
              />
            }
            name={"password-field"}
            control={control}
            rules={{ required: true }}
          />
          <Controller
            as={
              <TextField
                id="password_confirmation"
                label="Confirm New Password"
                variant="outlined"
                type="password"
              />
            }
            name={"password-field"}
            control={control}
            rules={{ required: true }}
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log("hello");
    debugger;
  };

  return (
    <div className="password-form-container">
      <p className="email-display">Current Email: {currentUser.email} </p>
      <form className="email-password-form" onSubmit={handleSubmit(onSubmit)}>
        <button name="email" onClick={handleClick}>
          Change Email?
        </button>
        <br />
        {generateEmailFields()}
        <br />
        <button name="password" onClick={handleClick}>
          Change Password?
        </button>
        <br />
        {generatePasswordFields()}
        <br />
        <p>Por favor proporcione su contraseña actual:</p>
        <Controller
          as={
            <TextField
              id="current_password"
              label="Current Password"
              variant="outlined"
              type="password"
            />
          }
          name={"current-password-field"}
          control={control}
          rules={{ required: true }}
        />
        <br />
        <input type="submit" className="primary-btn" value="Guardar" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

export default connect(mapStateToProps)(EmailPasswordForm);
