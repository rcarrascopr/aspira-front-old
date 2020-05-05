import React from "react";
import PrimaryNav from "./PrimaryNav";
import SecondaryNav from "./SecondaryNav";

import "./nav.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <PrimaryNav />
      <SecondaryNav />
    </nav>
  );
};

export default Navbar;
