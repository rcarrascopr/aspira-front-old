import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function addLinkToAssignment(formData) {
  const url = `${api_url}links`;
  return (dispatch) => {
    dispatch({ type: "LOADING_ACTIVITIES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ link: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El enlace ha sido añadido.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "CREATE_LINK", payload: data });
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

export function updateLink(linkId, formData) {
  const url = `${api_url}links/${linkId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_LINKS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ link: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El enlace ha sido actualizada.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "UPDATE_LINK", payload: data });
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

export function deleteLink(linkId) {
  const url = `${api_url}links/${linkId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_ACTIVITIES" });
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
            "El enlace ha sido eliminada correctamente.",
            "success"
          );
          return dispatch({
            type: "DELETE_LINK",
            loading: false,
            payload: linkId,
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
