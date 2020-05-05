import React from "react";

import { Link } from "react-router-dom";

export const DashboardContainer = () => {
  return (
    <div>
      <ul>
        <Link to="/estudiante ">
          <li>Manejar Estudiantes</li>
        </Link>
        <Link>
          <li>Manejar Facultad</li>
        </Link>
        <Link>
          {" "}
          <li>Manejar UTI</li>
        </Link>
        <Link>
          <li>Manejar Eventos</li>
        </Link>
      </ul>
    </div>
  );
};
