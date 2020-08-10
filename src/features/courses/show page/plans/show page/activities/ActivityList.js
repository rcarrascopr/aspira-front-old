import React from "react";

import ActivityListItem from "./ActivityListItem";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AddActivityToUTIS } from "../../../../../../actions/activityActions";

const MySwal = withReactContent(Swal);

function ActivityList(props) {
  const generateModal = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Crear actividad",
      html:
        '<input id="swal2-name" placeholder="Nombre de la actividad" class="swal2-input" required>' +
        '<textarea id="swal2-description" placeholder="Descripción" class="swal2-textarea" required>',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: "crear",
      preConfirm: () => {
        return [
          document.getElementById("swal2-name").value,
          document.getElementById("swal2-description").value,
        ];
      },
    });

    if (formValues) {
      props.AddActivityToUTIS({
        name: formValues[0],
        description: formValues[1],
        plan_id: props.currentUTIS.id,
      });
    }
  };

  const generateActivityListItems = () => {
      return props.currentUTIS.activities.map((activity) => {
        return <ActivityListItem {...activity} />;
      });
    
  };

  const generateContent = () => {
    if (
      props.currentUTIS.activities &&
      props.currentUTIS.activities.length > 0
    ) {
      return <>{generateActivityListItems()}</>;
    } else {
      return (
        <h2
          className="dark-purple-text"
          style={{ display: "flex", justifyContent: "center" }}
        >
          La UTIS no tiene ninguna actividad. Añade una actividad con el botón
          de arriba.
        </h2>
      );
    }
  };

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2 className="dark-purple-text">Actividades</h2>
        <a className="primary-btn" onClick={() => generateModal()}>
          + Añadir
        </a>
      </div>
      <div>{generateContent()}</div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    currentUTIS: state.utis.currentUTIS,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    AddActivityToUTIS: (formData) => dispatch(AddActivityToUTIS(formData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ActivityList));
