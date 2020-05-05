import React, { useState } from "react";

import { NameCircle } from "../../commons/NameCircle";

import SelectInput from "../../commons/inputs/SelectInput";

import { Link } from "react-router-dom";

export const SecondaryNav = () => {
  const [semester, setSemester] = useState("2015-16 01");

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  return (
    <section className="secondary-nav very-light-purple white-text">
      <div className="nav-header">
        {/* <img src="" alt="Profile image" /> */}
        <NameCircle initials="KY"/>

        <div className="name-header">
          <h2>Nombre de usuario</h2>
          <Link to="/" className="white-text">
            Ver mi perfil
          </Link>
        </div>
      </div>

      <SelectInput
        name="semester"
        label="Semestre"
        value={semester}
        labelWidth={70}
        items={["2015-16 01", "2015-16 02"]}
        handleChange={handleChange}
      />
    </section>
  );
};

export default SecondaryNav;
