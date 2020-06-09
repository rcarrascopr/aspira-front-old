import React from "react";

import ProductListContainer from "./ProductListContainer";
import StudentListCard from "./StudentListCard";
import StudentsRegisteredCard from "./StudentsRegistedCard";



import "./UTISShowContainer.css";

export default function UTISShowContainer(props) {
  return (
    <section className="utis-show-container">
      <ProductListContainer />
      <div className="course-card-wrapper">
        <StudentsRegisteredCard />
        <StudentListCard />
      </div>
    </section>
  );
}
