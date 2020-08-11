import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function fetchUTIS(utisId) {
  const url = `${api_url}plans/${utisId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_UTIS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return dispatch({ type: "FETCH_UTIS", payload: data, loading: false });
      });
  };
}

export function AddUTISToCourse(formData) {
  const url = `${api_url}plans`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ plan: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El UTIS ha sido añadido.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({
          type: "ADD_UTIS_TO_COURSE",
          payload: data,
          loading: false,
        });
      });
  };
}

export function updateUTIS(utisId, formData) {
  const url = `${api_url}plans/${utisId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ plan: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El UTIS ha sido actualizado.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "UPDATE_UTIS", payload: data, loading: false });
      });
  };
}

export function deleteUTIS(utisId) {
  const url = `${api_url}plans/${utisId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          MySwal.fire({
            title: "Hubo un error.",
            icon: "error",
            confirmButtonText: "continuar",
          });
        } else {
          MySwal.fire(
            "¡Eliminado!",
            "La UTIS ha sido eliminada correctamente.",
            "success"
          );
          return dispatch({
            type: "DELETE_UTIS",
            payload: utisId,
            loading: false,
          });
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
