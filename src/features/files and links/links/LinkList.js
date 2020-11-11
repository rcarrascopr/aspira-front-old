import React from "react";

import Link from "./Link";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { connect } from "react-redux";

import {
  addLinkToAssignment,
  updateLink,
  deleteLink,
} from "../../../actions/linkActions";

const MySwal = withReactContent(Swal);

function LinkList(props) {
  const generateLinks = () => {
    if (props.assignment.links) {
      return props.assignment.links.map((link) => {
        return (
          <Link
            link={link}
            key={link.id}
            generateModal={generateModal}
            generateDeleteModal={generateDeleteModal}
            canModify={
              (props.assignmentType === "StudentProduct" &&
                props.currentUser.role === "Student") ||
              ((props.assignmentType === "Product" ||
                props.assignmentType === "Activity" ||
                props.assignmentType === "StudentProduct") &&
                (props.currentUser.role === "Admin" ||
                  props.currentUser.role === "Teacher"))
            }
          />
        );
      });
    }
  };

  const generateModal = async (id) => {
    let link = {};
    if (id) {
      link = props.assignment.links.find((link) => link.id === id);
    }

    const { value: formValues } = await MySwal.fire({
      title: `${id ? "Editar" : "Añadir"} Enlace`,
      html:
        `<input id="swal2-text" placeholder="Google" class="swal2-input" value="${
          link.text || ""
        }" required>` +
        `<input id="swal2-url" placeholder="https://google.com" class="swal2-input" value="${
          link.url || ""
        }" required>`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: id ? "guardar" : "crear",
      preConfirm: () => {
        return [
          document.getElementById("swal2-text").value,
          document.getElementById("swal2-url").value,
        ];
      },
    });

    if (formValues) {
      // MySwal.fire(JSON.stringify(formValues));

      let formData = {
        text: formValues[0],
        url: formValues[1],
        assignment_id: props.assignment.id,
        assignment_type: props.assignmentType,
      };
      if (id) {
        props.updateLink(id, formData);
      } else {
        props.createLink(formData);
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
        props.deleteLink(id);
      }
    });
  };

  const generateContent = () => {
    let header;
    let links;
    let addButton;

    if (
      props.assignment &&
      props.assignment.links &&
      props.assignment.links.length > 0
    ) {
      links = generateLinks();
    }

    if (
      (props.assignmentType === "StudentProduct" &&
        props.currentUser.role === "Student") ||
      ((props.assignmentType === "Product" ||
        props.assignmentType === "Activity" ||
        props.assignmentType === "StudentProduct") &&
        (props.currentUser.role === "Admin" ||
          props.currentUser.role === "Teacher"))
    ) {
      addButton = (
        <a className="tertiary-btn" onClick={() => generateModal()}>
          + Añadir enlace
        </a>
      );
    }

    if (links || addButton) {
      header = <p className="dark-purple-text">Enlaces</p>;
    }

    return (
      <>
        {header}
        {links}
        {addButton}
      </>
    );
  };
  return <div>{generateContent()}</div>;
}

let mapStateToProps = (state) => {
  return {
    currentActivity: state.activities.currentActivity,
    currentUser: state.users.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    createLink: (formData) => dispatch(addLinkToAssignment(formData)),
    updateLink: (linkId, formData) => dispatch(updateLink(linkId, formData)),
    deleteLink: (linkId) => dispatch(deleteLink(linkId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkList);
