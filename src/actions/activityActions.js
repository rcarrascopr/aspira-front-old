import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function fetchActivity(activityId) {
  const url = `${api_url}activities/${activityId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_ACTIVITIES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH_ACTIVITY", payload: data });
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

export function AddActivityToUTIS(formData) {
  const url = `${api_url}activities`;
  return (dispatch) => {
    dispatch({ type: "LOADING_UTIS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ activity: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "La actividad ha sido añadido.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "ADD_ACTIVITY_TO_UTIS", payload: data });
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

export function updateActivity(activityId, formData) {
  const url = `${api_url}activities/${activityId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_UTIS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ activity: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "La actividad ha sido actualizada.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "UPDATE_ACTIVITY", payload: data });
      })
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          title: "Hubo un error.",
          icon: "error",
          confirmButtonText: "continuar",
        });
      });
  };
}

export function deleteActivity(activityId) {
  const url = `${api_url}activities/${activityId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_UTIS" });
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
            "La actividad ha sido eliminada correctamente.",
            "success"
          );
          return dispatch({
            type: "DELETE_ACTIVITY",
            loading: false,
            payload: activityId,
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
