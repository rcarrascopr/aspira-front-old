import React from "react";

import UTISItem from "./UTISItem";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AddUTISToCourse } from "../../../../actions/UTISActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function UTISList(props) {
  const generateUTISItems = () => {
    return props.currentCourse.plans.map((utis) => {
      return <UTISItem utis={utis} key={utis.id} />;
    });
  };

  const generateModal = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Nombre de UTIS",
      html:
        '<input id="swal2-name" placeholder="Nombre de la UTIS" class="swal2-input" required>',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: "crear",
      preConfirm: () => {
        return [document.getElementById("swal2-name").value];
      },
    });

    if (formValues) {
      // MySwal.fire(JSON.stringify(formValues));

      props.AddUTISToCourse({
        name: formValues[0],
        course_id: props.match.params.id,
      });
    }
  };

  const generateContent = () => {
    if (props.currentCourse.plans && props.currentCourse.plans.length > 0) {
      return <>{generateUTISItems()}</>;
    } else {
      return (
        <h2
          className="dark-purple-text"
          style={{ display: "flex", justifyContent: "center" }}
        >
          El curso no tiene ninguna UTIS. Añade una utis con el botón de arriba.
        </h2>
      );
    }
  };

  return (
    <div className="utis-list">
      <a
        className="primary-btn-outline dark-purple-text"
        onClick={() => generateModal()}
      >
        Añadir UTIS
      </a>
      {generateContent()}
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    currentCourse: state.courses.currentCourse,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    AddUTISToCourse: (formData) => dispatch(AddUTISToCourse(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UTISList));
