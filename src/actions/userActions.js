import { api_url } from "../commons/api_url";

export function loginAction(formData) {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    return fetch(`${api_url}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        localStorage.setItem("token", responseJSON.token);
        localStorage.setItem("currentUser", JSON.stringify(responseJSON));
        dispatch({ type: "LOGIN", payload: responseJSON });
      })
      .catch((error) => {});
  };
}

export function logoutAction() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: "LOGOUT_USER" });
      resolve();
    });
  };
}

export function userCreate(data) {
  return (dispatch) => {
    dispatch({ type: "LOADING_USER" });
    return fetch(
      `${api_url}${
        data.account_type === "admin" ? "signup" : data.account_type + "s"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: data }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (responseJSON.error) {
          console.log(responseJSON.error);
        } else {
          console.log("Success", responseJSON);
          dispatch({ type: "CREATE_USER" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
