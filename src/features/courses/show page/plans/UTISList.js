import React from "react";

import UTISItem from "./UTISItem";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  AddUTISToCourse,
  updateUTIS,
  deleteUTIS,
} from "../../../../actions/UTISActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function UTISList(props) {
  const generateUTISItems = () => {
    return props.currentCourse.plans.map((utis, index) => {
      return (
        <UTISItem
          utis={utis}
          key={utis.id}
          generateModal={generateModal}
          generateDeleteModal={generateDeleteModal}
          index={index}
        />
      );
    });
  };

  const generateModal = async (id) => {
    let utisName = "";
    if (id) {
      let currentPlan = props.currentCourse.plans.find(
        (utis) => utis.id === id
      );
      utisName = currentPlan.name;
    }
    const { value: formValues } = await MySwal.fire({
      title: `${id ? "Editar" : "Crear"} UTIS`,
      html: `<input id="swal2-name" placeholder="Nombre de la UTIS" class="swal2-input" value="${utisName}" required>`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: id ? "guardar" : "crear",
      preConfirm: () => {
        return [document.getElementById("swal2-name").value];
      },
    });

    if (formValues) {
      // MySwal.fire(JSON.stringify(formValues));
      let formData = {
        name: formValues[0],
        course_id: props.match.params.id,
      };
      if (id) {
        props.updateUTIS(id, formData);
      } else {
        props.AddUTISToCourse(formData);
      }
    }
  };

  const generateDeleteModal = (id) => {
    Swal.fire({
      title: "¿Estas seguro que lo quieres eliminar?",
      text: "¡No hay vuelta atrás!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#282460",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminar!",
    }).then((result) => {
      if (result.value) {
        props.deleteUTIS(id);
      }
    });
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
      <a className="primary-btn" onClick={() => generateModal()}>
        + Añadir UTIS
      </a>
      <div className="utis-list-content">{generateContent()}</div>
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
    updateUTIS: (utisId, formData) => dispatch(updateUTIS(utisId, formData)),
    deleteUTIS: (utisId) => dispatch(deleteUTIS(utisId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UTISList));
