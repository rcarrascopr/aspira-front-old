import React, { useState, useEffect } from "react";

import ActivityListItem from "./ActivityListItem";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  AddActivityToUTIS,
  updateActivity,
  deleteActivity,
  sortActivities,
} from "../../../../../../actions/activityActions";

import { deleteProduct } from "../../../../../../actions/productActions";

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

function ActivityList(props) {

  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(() => {
    setActivitiesList(props.currentUTIS.activities);
  }, [props.currentUTIS.activities]);

  const generateModal = async (id) => {
    let activity = {};
    if (id) {
      activity = props.currentUTIS.activities.find((a) => a.id === id);
    }
    const { value: formValues } = await MySwal.fire({
      title: `${id ? "Editar" : "Crear"} actividad`,
      html:
        `<input id="swal2-name" placeholder="Nombre de la actividad" class="swal2-input" value="${
          activity.name || ""
        }" required>` +
        `<textarea id="swal2-description" placeholder="Descripción" class="swal2-textarea">${
          activity.description || ""
        }</textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "cancelar",
      confirmButtonText: id ? "guardar" : "crear",
      preConfirm: () => {
        return [
          document.getElementById("swal2-name").value,
          document.getElementById("swal2-description").value,
        ];
      },
    });

    if (formValues) {
      let formData = {
        name: formValues[0],
        description: formValues[1],
        plan_id: props.currentUTIS.id,
      };
      if (id) {
        props.updateActivity(id, formData);
      } else {
        props.AddActivityToUTIS(formData);
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
        if (id.productId) {
          props.deleteProduct(id.productId);
        } else if (id.activityId) {
          props.deleteActivity(id.activityId);
        }
      }
    });
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      activitiesList,
      result.source.index,
      result.destination.index
    );

    setActivitiesList(items);
    props.sortActivities(items.map((item) => item.id));
  };

  const generateActivityListItems = () => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => {
            return (
              <div
                ref={droppableProvided.innerRef}
                style={getListStyle(droppableSnapshot.isDraggingOver)}
              >
                {activitiesList &&
                  activitiesList.map((activity, index) => {
                    return (
                      <Draggable
                        key={activity.id}
                        draggableId={activity.id.toString(10)}
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
                            <ActivityListItem
                              {...activity}
                              key={activity.id}
                              generateModal={generateModal}
                              generateDeleteModal={generateDeleteModal}
                              currentUser={props.currentUser}
                              index={index}
                              isDragging={draggableSnapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  })
                }
                {droppableProvided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    );
  }


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
    <div className="activity-list">
      <div className="activity-list-header">
        <h2 className="dark-purple-text" style={{ fontSize: "3em" }}>
          Actividades
        </h2>
        {(props.currentUser.role === "Admin" ||
          props.currentUser.role === "Teacher") && (
          <a className="primary-btn" onClick={() => generateModal()}>
            + Añadir
          </a>
        )}
      </div>
      <div>{generateContent()}</div>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    currentUTIS: state.utis.currentUTIS,
    currentUser: state.users.currentUser,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    AddActivityToUTIS: (formData) => dispatch(AddActivityToUTIS(formData)),
    updateActivity: (activityId, formData) =>
      dispatch(updateActivity(activityId, formData)),
    deleteActivity: (activityId) => dispatch(deleteActivity(activityId)),
    deleteProduct: (productId) => dispatch(deleteProduct(productId)),
    sortActivities: (activityIds) => dispatch(sortActivities(activityIds)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ActivityList));
