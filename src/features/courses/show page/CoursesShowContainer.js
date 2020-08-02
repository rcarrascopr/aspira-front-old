import React from "react";

import UTISList from "./plans/UTISList";

import { connect } from "react-redux";

import "./coursesShowContainer.css";

const utis = [
  { name: "UTIS 1", products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { name: "UTIS 2", products: [1, 2, 3, 4, 5] },
  { name: "UTIS 3", products: [1, 2, 3] },
  { name: "UTIS 4", products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { name: "UTIS 5", products: [1] },
  { name: "UTIS 6", products: [1, 2, 3] },
];

function CoursesShowContainer(props) {
  return (
    <section className="courses-show-container courses-purple">
      <h1
        className="dark-purple-text"
        style={{ display: "flex", justifyContent: "center" }}
      >
        UTIS del curso: Nombre del curso
      </h1>

      <hr />

      <UTISList utis={utis} />
    </section>
  );
}

let mapStateToProps = (state) => {
  return {};
};

let mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesShowContainer);
