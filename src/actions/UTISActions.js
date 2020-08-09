import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
        return dispatch({ type: "ADD_UTIS_TO_COURSE", payload: data });
      });
  };
}
