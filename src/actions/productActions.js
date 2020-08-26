import React from "react";

import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function fetchProduct(productId) {
  const url = `${api_url}products/${productId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_PRODUCT" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "SET_PRODUCT", payload: data }))
      .catch((error) => {
        MySwal.fire({
          title: "Hubo un error.",
          icon: "error",
          confirmButtonText: "continuar",
        });
      });
  };
}

export function createProduct(formData) {
  const url = `${api_url}products`;
  return (dispatch) => {
    dispatch({ type: "LOADING_ACTIVITIES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ product: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El producto ha sido creado.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "CREATE_PRODUCT", payload: data });
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

export function updateProduct(productId, formData) {
  const url = `${api_url}products/${productId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_ACTIVITIES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ product: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El producto ha sido actualizado.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "UPDATE_PRODUCT", payload: data });
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

export function deleteProduct(productId) {
  const url = `${api_url}products/${productId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_UTIS" });
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.message) {
          MySwal.fire(
            "¡Eliminado!",
            "El producto ha sido eliminado correctamente.",
            "success"
          );
          return dispatch({
            type: "DELETE_PRODUCT",
            payload: productId,
            loading: false,
          });
        } else {
          MySwal.fire({
            title: "Hubo un error.",
            icon: "error",
            confirmButtonText: "continuar",
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
