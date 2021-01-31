import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function fetchSemesters() {
  return (dispatch) => {
    dispatch({ type: "LOADING_SEMESTERS" });
    return fetch(`${api_url}semesters`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_SEMESTERS", payload: responseJSON });
      })
      .catch((error) => {});
  };
}

export function fetchSemester(id) {
  return (dispatch) => {
    dispatch({ type: "LOADING_SEMESTERS" });
    return fetch(`${api_url}semesters/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_SEMESTER", payload: responseJSON });
      })
      .catch((error) => {});
  };
}

export function createSemester(formData) {
  const url = `${api_url}semesters`;
  return (dispatch) => {
    dispatch({ type: "LOADING_SEMESTERS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ semester: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El semestre se ha creado.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "CREATE_SEMESTER", payload: data });
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

export function editSemester(semesterId, formData) {
  const url = `${api_url}semesters/${semesterId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_SEMESTERS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ semester: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El semestre se ha actualizado.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "EDIT_SEMESTER", payload: data });
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


export function updateCurrentSelectedSemester(semester) {
  return (dispatch) => {
    dispatch({type: "UPDATE_CURRENT_SELECTED_SEMESTER", payload: semester})
  };
}
