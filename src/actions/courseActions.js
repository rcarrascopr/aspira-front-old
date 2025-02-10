import React from "react";
import { api_url } from "../commons/api_url";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function fetchCourses() {
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(`${api_url}courses`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_COURSES", payload: responseJSON });
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

export function setCoursesFormData(formData) {
  return (dispatch) =>
    dispatch({ type: "SET_COURSES_FORM_DATA", payload: formData });
}

export function createCourse(formData) {
  const url = `${api_url}courses`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ course: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El curso ha sido creado.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "CREATE_CURRENT_COURSE", payload: data });
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

export function editCourse(courseId, formData) {
  const url = `${api_url}courses/${courseId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PUT",
      body: JSON.stringify({ course: formData }),
    })
      .then((response) => response.json())
      .then((data) => {
        MySwal.fire({
          title: "El curso ha sido actualizado.",
          icon: "success",
          confirmButtonText: "continuar",
        });
        return dispatch({ type: "EDIT_COURSE", payload: data });
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

export function fetchOneCourse(courseId) {
  const url = `${api_url}courses/${courseId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_CURRENT_COURSE", payload: data });
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

export function fetchCourseReport(courseId, studentId) {
  const url = `${api_url}courses/${courseId}/students/${studentId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_CURRENT_COURSE", payload: data });
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

export function fetchCourseSummaryReport(courseId) {
  const url = `${api_url}courses/${courseId}/summary_report`;
  return (dispatch) => {
    dispatch({ type: "LOADING_COURSES" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_CURRENT_COURSE", payload: data });
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



export function resetCoursesFormData() {
  return (dispatch) => {
    dispatch({ type: "RESET_COURSES_FORM_DATA" });
  };
}
