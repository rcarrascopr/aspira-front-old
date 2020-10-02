import React from "react";

import { Paper } from "@material-ui/core";
import FileAndLinkContainer from "../../../../../../../files and links/FileAndLinkContainer";

import { submitProduct } from "../../../../../../../../actions/productActions";

import { connect } from "react-redux";

function SubmitProductCard(props) {
  const generateFileAndLinkContainer = () => {
    let student = props.product.students.find(
      (student) => student.id === props.currentUser.id
    );
    if (student && student.student_product)
      return (
        <FileAndLinkContainer
          assignment={student.student_product}
          assignmentType={"StudentProduct"}
        />
      );
  };

  const generateSubmissionButton = () => {
    let student = props.product.students.find(
      (student) => student.id === props.currentUser.id
    );
    if (
      student &&
      student.student_product &&
      student.student_product.submitted
    ) {
      return (
        <a className="tertiary-btn-outline disabled" style={{ width: "100%" }}>
          <strong>Producto entregado</strong>
        </a>
      );
    } else {
      return (
        <a
          className="tertiary-btn"
          style={{ width: "100%" }}
          onClick={handleSubmit}
        >
          <strong>Entregar producto</strong>
        </a>
      );
    }
  };

  const handleSubmit = () => {
    let student = props.product.students.find(
      (student) => student.id === props.currentUser.id
    );
    props.submitProduct(student.student_product.id, props.currentUser.id);
  };

  return (
    <Paper elevation={1} className="student-side-card">
      <p className="dark-purple-text">
        <strong>Entrega de producto</strong>
      </p>
      {generateFileAndLinkContainer()}
      {generateSubmissionButton()}
    </Paper>
  );
}

let mapStateToProps = (state) => {
  return {
    currentActivity: state.activities.currentActivity,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    submitProduct: (productId, studentId) =>
      dispatch(submitProduct(productId, studentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProductCard);
