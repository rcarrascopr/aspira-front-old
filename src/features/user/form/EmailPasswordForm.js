import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import Error from "../../../commons/inputs/Error";
import ShowPasswordCheckbox from "../../../commons/inputs/ShowPasswordCheckbox";

import { accountUpdate, logoutAction } from "../../../actions/userActions";

function EmailPasswordForm({
  currentUser,
  accountUpdate,
  logoutAction,
  error,
  success,
  history,
}) {
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);
  const [passwordOrText, setPasswordOrText] = useState("password");
  const { control, errors, watch, handleSubmit } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
      email: "",
      email_confirmation: "",
    },
  });

  const handleClick = (event) => {
    const name = event.target.name;
    if (name === "email-enabler") {
      setEmailState(!emailState);
      event.target.innerText = emailState
        ? "Cambiar Correo Electrónico?"
        : "Eliminar Nuevo Correo Electrónico";
    } else if (name === "password-enabler") {
      setPasswordState(!passwordState);
      event.target.innerText = passwordState
        ? "Cambiar Contraseña?"
        : "Eliminar Nuevo Contraseña";
    }
  };

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    const state = checked ? "text" : "password";
    setPasswordOrText(state);
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
                id="email-field"
                label="Nuevo Correo Electrónico"
                variant="outlined"
                type="email"
              />
            }
            name={"email"}
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
          />
          <Error errors={errors["email"]} />
          <Controller
            as={
              <TextField
                id="email-field"
                label="Confirme Nuevo Correo Electrónico"
                variant="outlined"
                type="email"
              />
            }
            name={"email_confirmation"}
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
              validate: (value) =>
                value === watch("email") ||
                "El correo electrónico no coincide.",
            }}
          />
          <Error errors={errors["email_confirmation"]} />
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
                id="password-field"
                label="Nueva Contraseña"
                variant="outlined"
                type={passwordOrText}
              />
            }
            name={"password"}
            control={control}
            rules={{ required: true }}
          />
          <Error errors={errors["password"]} />
          <Controller
            as={
              <TextField
                id="password-field"
                label="Confirmar Nueva Contraseña"
                variant="outlined"
                type={passwordOrText}
              />
            }
            name={"password_confirmation"}
            control={control}
            rules={{
              required: true,
              validate: (value) =>
                value === watch("password") || "La contraseña no coincide",
            }}
          />
          <Error errors={errors["password_confirmation"]} />
          <br />
          <ShowPasswordCheckbox
            checked={passwordOrText === "password" ? false : true}
            handleChange={handleCheckboxChange}
          />
        </div>
      );
    } else {
      return <></>;
    }
  };

  const onSubmit = (data) => {
    const count = Object.keys(data).length;
    if (count < 3) {
      alert("No changes were made.");
      return;
    } else if (data.email === data.email_confirmation) {
      delete data.email_confirmation;
    } else {
      alert("Emails do not match!");
      return;
    }
    accountUpdate(data);
  };

  useEffect(() => {
    if (success) {
      logoutAction();
      history.push("/login");
      alert(success);
    } else if (error) {
      alert(error);
    }
  }, [error, success]);

  return (
    <div className="password-form-container">
      <p className="email-display">Current Email: {currentUser.email} </p>
      <form className="email-password-form" onSubmit={handleSubmit(onSubmit)}>
        <a name="email-enabler" href="javascript:void(0)" onClick={handleClick}>
          Cambiar Correo Electrónico?
        </a>
        <br />
        {generateEmailFields()}
        <br />
        <a
          name="password-enabler"
          href="javascript:void(0)"
          onClick={handleClick}
        >
          Cambiar Contraseña?
        </a>
        <br />
        {generatePasswordFields()}
        <br />
        <p>Por favor proporcione su contraseña actual:</p>
        <Controller
          as={
            <TextField
              label="Current Password"
              variant="outlined"
              type={passwordOrText}
            />
          }
          name={"current_password"}
          control={control}
          rules={{ required: true }}
        />
        <Error errors={errors["current_password"]} />
        <br />
        <ShowPasswordCheckbox
          checked={passwordOrText === "password" ? false : true}
          handleChange={handleCheckboxChange}
        />
        <br />
        <input type="submit" className="primary-btn" value="Guardar" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
  error: state.users.error,
  success: state.users.success,
});

const mapDispatchToProps = (dispatch) => ({
  accountUpdate: (data) => dispatch(accountUpdate(data)),
  logoutAction: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailPasswordForm);
