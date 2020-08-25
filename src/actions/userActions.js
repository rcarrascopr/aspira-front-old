import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function loginAction(formData) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`${api_url}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((responseJSON) => {
        localStorage.setItem("token", responseJSON.token);
        localStorage.setItem("currentUser", JSON.stringify(responseJSON));
        dispatch({ type: "LOGIN", payload: responseJSON });
      })
      .catch((error) => {
        MySwal.fire({
          title: `${error}. Correo electrónico o contraseña no fueron válidos.`,
          icon: "error",
          confirmButtonText: "continuar",
        });
      });
  };
}

export function logoutAction() {
  const url = api_url + "logout";
  return (dispatch) => {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(dispatch({ type: "LOGOUT_USER" }));
  };
}

export function userCreate(data) {
  return (dispatch) => {
    dispatch({ type: "LOADING_USER" });

    return fetch(
      `${api_url}${
        data.role === "Admin" ? "signup" : data.role.toLowerCase() + "s"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: data }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (responseJSON.error) {
          // console.log(responseJSON.error);
        } else {
          MySwal.fire({
            title: "El usuario se ha creado.",
            icon: "success",
            confirmButtonText: "continuar",
          });

          dispatch({ type: "CREATE_USER" });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: "Hubo un error.",
          icon: "error",
          confirmButtonText: "continuar",
        });
      });
  };
}

// action to edit user's information on their account
export function userEdit(data, userId) {
  const url = api_url + `users/${userId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_USER" });
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ user_update: data }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
          return;
        } else {
          MySwal.fire({
            title: "El usuario se ha actualizado.",
            icon: "success",
            confirmButtonText: "continuar",
          });
          return dispatch({ type: "SET_USER", payload: data });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: "Hubo un error.",
          icon: "error",
          confirmButtonText: "continuar",
        });
      });
  };
}

// action to update user's email and/or password
export function accountUpdate(data) {
  const url = api_url + "signup";
  return (dispatch) => {
    dispatch({ type: "LOADING_USER" });
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ account_update: data }),
    })
      .then((response) => response.json())
      .then((data) => {
        //store success or error in global store for useEffect to be called within <EmailPasswordForm />
        if (data.status >= 200 && data.status < 300) {
          dispatch({ type: "SET_USER_SUCCESS", payload: data.success });
        } else {
          dispatch({ type: "SET_USER_ERRORS", payload: data.errors });
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: "Hubo un error.",
          icon: "error",
          confirmButtonText: "continuar",
        });
      });
  };
}

export function fetchUser(userId) {
  const url = `${api_url}users/${userId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_USER" });

    return fetch(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((responseJSON) => {
        dispatch({ type: "SET_USER", payload: responseJSON });
      })
      .catch((error) => dispatch({ type: "SET_USER_ERRORS", payload: error }));
  };
}

export function userNotFoundError(props) {
  return (dispatch) => {
    dispatch({ type: "CLEAR_USER_ERROR" });
    alert(props.error.message);
    props.history.push("/");
  };
}

export function fetchTeachers() {
  return (dispatch) => {
    dispatch({ type: "LOADING_USER" });
    return fetch(`${api_url}teachers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_TEACHERS", payload: responseJSON });
      })
      .catch((error) => {
        MySwal.fire({
          title: "Hubo un error.",
          icon: "error",
          confirmButtonText: "continuar",
        });
      });
  };
}

export function resetUserForm() {
  return (dispatch) => {
    dispatch({ type: "RESET_USER_FORM" });
  };
}
