import { api_url } from "../commons/api_url";

export function loginAction(formData) {
    return dispatch => {
      dispatch({ type: "LOADING" });
      return fetch(`${api_url}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
            return response.json();
        })
        .then(responseJSON => {
          localStorage.setItem("token", responseJSON.token);
          localStorage.setItem("currentUserId", responseJSON.id);
          dispatch({ type: "LOGIN", payload: responseJSON });
        }).catch(error => {
         
        });
    };
  }