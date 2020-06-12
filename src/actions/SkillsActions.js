import { api_url } from "../commons/api_url";

export function getSkills() {
    return (dispatch) => {
      dispatch({ type: "LOADING_SKILLS" });
      return fetch(`${api_url}skills`)
        .then((response) => {
          return response.json();
        })
        .then((responseJSON) => {
          dispatch({ type: "FETCH_SKILLS", payload: responseJSON });
        })
        .catch((error) => {});
    };
  }