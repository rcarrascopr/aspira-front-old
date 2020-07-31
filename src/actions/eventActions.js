import { api_url } from "../commons/api_url";

export function fetchEvents() {
  return (dispatch) => {
    dispatch({ type: "LOADING_EVENTS" });
    return fetch(`${api_url}events`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        dispatch({ type: "FETCH_EVENTS", payload: responseJSON });
      });
  };
}

export function createEvent(formData) {
  const url = `${api_url}events`;
  return (dispatch) => {
    dispatch({ type: "LOADING_EVENTS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ event: formData }),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "CREATE_EVENT", payload: data }));
  };
}

export function editEvent(eventId, formData) {
  const url = `${api_url}events/${eventId}`;
  return (dispatch) => {
    dispatch({ type: "LOADING_EVENTS" });
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "PATCH",
      body: JSON.stringify({ event: formData }),
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "EDIT_EVENT", payload: data }));
  };
}
