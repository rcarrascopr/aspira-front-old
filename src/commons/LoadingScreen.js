import React from "react";

export const LoadingScreen = props => {
  return (
    <div>
      <h1>LOADING</h1>
      <p>{props.content}</p>
    </div>
  );
};
