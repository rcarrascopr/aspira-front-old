import React, { useState, useEffect } from "react";

import UTISItem from "./UTISItem";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  AddUTISToCourse,
  updateUTIS,
  deleteUTIS,
  sortUTIS,
} from "../../../../actions/UTISActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle, snapshot) => {
  let dropping = snapshot.dropAnimation;
  if (!dropping) {
    return {
      // some basic styles to make the items look a bit nicer
      userSelect: "none",

      // styles we need to apply on draggables
      ...draggableStyle,
    };
  }

  const { moveTo, curve, duration } = dropping;

  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  const rotate = "rotate(1turn)";

  return {
    ...draggableStyle,
    transform: `${translate} scale(0.9)`,
    // slowing down the drop
    transition: `all ${curve} ${duration}s`,
  };
};

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "grey",
  border: isDraggingOver
    ? "5px dashed rgba(91, 65, 162, 0.3)"
    : "5px dashed rgba(91, 65, 162, 0)",
  // width: 250,
});

function UTISList(props) {
  const [utisList, setUtisList] = useState([]);

  useEffect(() => {
    setUtisList(props.currentCourse.plans);
  }, [props.currentCourse.plans]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      utisList,
      result.source.index,
      result.destination.index
    );

    setUtisList(items);
    props.sortUTIS(items.map((item) => item.id));
  };

  const generateUTISItems = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => {
            return (
              <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}
              >
                {utisList &&
                  utisList.map((utis, index) => {
                    if (
                      props.currentUser.role === "Admin" ||
                      props.currentUser.role === "Teacher"
                    ) {
                      return (
                        <Draggable
                          key={utis.id}
                          draggableId={utis.id.toString(10)}
                          index={index}
                        >
                          {(draggableProvided, draggableSnapshot) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              style={getItemStyle(
                                draggableSnapshot.isDragging,
                                draggableProvided.draggableProps.style,
                                draggableSnapshot
                              )}
                            >
                              <UTISItem
                                utis={utis}
                                key={utis.id}
                                generateModal={generateModal}
                                generateDeleteModal={generateDeleteModal}
                                index={index}
                                currentUser={props.currentUser}
                                isDragging={draggableSnapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    } else {
                      return (
                        <UTISItem
                          utis={utis}
                          key={utis.id}
                          generateModal={generateModal}
                          generateDeleteModal={generateDeleteModal}
                          index={index}
                          currentUser={props.currentUser}
                        />
                      );
                    }
                  })}
                {droppableProvided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
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
      {(props.currentUser.role === "Admin" ||
        props.currentUser.role === "Teacher") && (
        <a className="primary-btn" onClick={() => generateModal()}>
          + Añadir UTIS
        </a>
      )}
      <div className="utis-list-content">{generateContent()}</div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    currentCourse: state.courses.currentCourse,
    currentUser: state.users.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    AddUTISToCourse: (formData) => dispatch(AddUTISToCourse(formData)),
    updateUTIS: (utisId, formData) => dispatch(updateUTIS(utisId, formData)),
    deleteUTIS: (utisId) => dispatch(deleteUTIS(utisId)),
    sortUTIS: (utisIds) => dispatch(sortUTIS(utisIds)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UTISList));
