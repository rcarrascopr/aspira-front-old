import React from "react";

import UTISItem from "./UTISItem";

export default function UTISList(props) {
  const generateUTISItems = () => {
    if (props.utis) {
      return props.utis.map((utis) => {
        return <UTISItem utis={utis} />;
      });
    }
  };
  return (
    <div className="utis-list">
      <a className="primary-btn-outline dark-purple-text">Añadir UTIS</a>
      {generateUTISItems()}
    </div>
  );
}
