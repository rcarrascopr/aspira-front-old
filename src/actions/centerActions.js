import { api_url } from "../commons/api_url";

export function fetchCenters() {
  return (dispatch) => {
    dispatch({ type: "LOADING_CENTERS" });
    return fetch(`${api_url}centers`, {
      // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH_CENTERS", payload: data });
      })
      .catch((error) => {
        console.log("Error from centersAction: ", error);
      });
  };
}

export function fetchStudentsFromCenter(centerId) {
  const url = `${api_url}centers/${centerId}`;
  return (dispatch) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "FETCH_CENTER_STUDENTS", payload: data });
      })
      .catch((error) => console.log("Error from centersAction: ", error));
  };
}
