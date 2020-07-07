import { api_url } from "../commons/api_url";

export function fetchFacultyUsers() {
  return (dispatch) => {
    dispatch({ type: "LOADING_FACULTY" });
    return fetch(`${api_url}users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_FACULTY_USERS", payload: responseJSON });
      });
  };
}

export function fetchFacultyUser(id) {
  return (dispatch) => {
    dispatch({ type: "LOADING_FACULTY" });
    return fetch(`${api_url}users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_FACULTY_USER", payload: responseJSON });
      });
  };
}
