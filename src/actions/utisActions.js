import { api_url } from "../commons/api_url";

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
      });
  };
}

export function setUTISFormData(formData) {
  return (dispatch) =>
    dispatch({ type: "SET_UTIS_FORM_DATA", payload: formData });
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
      .then((data) => dispatch({ type: "CREATE_NEW_COURSE", payload: data }));
  };
}
