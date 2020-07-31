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
      })
      .catch((error) => console.log(error));
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
      })
      .catch((error) => console.log(error));
  };
}

export function createSemester(formData) {
  console.log("CREATE ACTION", JSON.stringify({ semester: formData }));
  const url = `${api_url}semesters`;
  return (dispatch) => {
    dispatch({ type: "LOADING_SEMESTERS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ semester: formData }),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "CREATE_SEMESTER", payload: data }));
  };
}

export function editSemester(semesterId, formData) {
  const url = `${api_url}semesters/${semesterId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_SEMESTERS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ semester: formData }),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "EDIT_SEMESTER", payload: data }));
  };
}
