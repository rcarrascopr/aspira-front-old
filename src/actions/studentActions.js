import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function fetchStudents() {
  return (dispatch) => {
    dispatch({ type: "LOADING_STUDENTS" });
    return fetch(`${api_url}students`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_STUDENTS", payload: responseJSON });
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

export function fetchStudent(id) {
  return (dispatch) => {
    dispatch({ type: "LOADING_STUDENTS" });
    return fetch(`${api_url}students/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_STUDENT", payload: responseJSON });
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
