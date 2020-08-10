import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
