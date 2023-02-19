import React from "react";

function MainWrapper(props) {
  const { children } = props;
  return (
    <div className="main-wrapper">
      <div className="content">{children}</div>
    </div>
  );
}

export default MainWrapper;
