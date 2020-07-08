import { api_url } from "../commons/api_url";

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
      });
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
      });
  };
}
