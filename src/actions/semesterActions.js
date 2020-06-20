import { api_url } from "../commons/api_url";

export const fetchSemesters = () => {
  return (dispatch) => {
    dispatch({ type: "LOADING_SEMESTER" });
    return fetch(`${api_url}semesters`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: "FETCH_SEMESTERS", payload: data }))
      .catch((error) => console.log(error));
  };
};
