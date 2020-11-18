import React, { useState, useEffect } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import FileAndLinkContainer from "../../files and links/FileAndLinkContainer";
import Skill from "../Skill";
import SelectInput from "../../../commons/inputs/SelectInput";

import { submitEvaluation } from "../../../actions/productActions";

import { connect } from "react-redux";

function Accordions(props) {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(
      props.product.students.map((student) => {
        let evaluations = student.levels.map((level) => {
          return {
            level_id: level.level.id,
            evaluation: level.evaluation,
          };
        });
        return {
          feedback: student.student_product.feedback,
          evaluations,
          submitted: student.student_product.submitted ? true : false,
        };
      })
    );
  }, []);

  const handleFeedbackChange = (event, index) => {
    let data = formData;
    data[index].feedback = event.target.value;
    setFormData([...data]);
  };

  const handleEvaluationChange = (event, index, level_index) => {
    let data = formData;
    data[index]["evaluations"][level_index].evaluation = event.target.value;
    setFormData([...data]);
  };

  const handleCheckboxChange = (index) => {
    let data = formData;
    data[index].submitted = !data[index].submitted;
    setFormData([...data]);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSubmit = (student, index) => {
    // console.log()
    props.submitEvaluation(
      student.student_product.id,
      student.id,
      formData[index]
    );
  };

  const generateSkills = (student, index) => {
    return props.product.levels.map((level, level_index) => {
      return (
        <div style={{ display: "flex" }}>
          <Skill {...level} />
          <SelectInput
            name="skill_evaluation"
            label="Evaluación"
            invert={true}
            labelWidth={80}
            items={[
              "Aprobado",
              "No aprobado",
              "No ha sido evaluado",
              "No aplica",
            ]}
            value={
              formData[index] && formData[index]["evaluations"][level_index]
                ? formData[index]["evaluations"][level_index].evaluation
                : ""
            }
            handleChange={(event) => {
              handleEvaluationChange(event, index, level_index);
            }}
            // value={
            //   currentCenter && currentCenter.id
            //     ? currentCenter.id
            //     : currentCenter
            // }
          />
        </div>
      );
    });
  };

  const generateAccordions = () => {
    return props.product.students.map((student, index) => {
      return (
        <Accordion
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}bh-content`}
            id={`panel${index + 1}bh-header`}
          >
            <Typography className="dark-purple-text">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className={`product-circle ${
                    student.student_product.submitted ? "submitted" : "pending"
                  }`}
                ></div>
                <strong>{student.name}</strong>
              </div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <p className="dark-purple-text submission-title">Estatus</p>
              <hr />
              <div
                className="submission-content-wrapper"
                style={{ paddingBottom: "20px" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        formData[index] && formData[index].submitted
                          ? formData[index].submitted
                          : false
                      }
                      onChange={(event) => {
                        handleCheckboxChange(index);
                      }}
                      name="submitted"
                      color="primary"
                    />
                  }
                  label="Producto entregado"
                />
              </div>

              <p className="dark-purple-text submission-title">
                Detalles de la entrega
              </p>
              <hr />
              <div className="submission-content-wrapper">
                <FileAndLinkContainer
                  assignment={student.student_product}
                  assignmentType="StudentProduct"
                />
              </div>

              <p className="dark-purple-text submission-title">
                Retroalimentación
              </p>
              <hr />
              <div className="submission-content-wrapper">
                <p className="dark-purple-text">Habilidades</p>
                {generateSkills(student, index)}
                <TextField
                  id="feedback"
                  label="Comentarios"
                  variant="outlined"
                  rows={4}
                  multiline
                  className={
                    "dark-purple-text textfield-outlined textfield-input"
                  }
                  onChange={(event) => {
                    handleFeedbackChange(event, index);
                  }}
                  value={
                    formData[index] && formData[index].feedback
                      ? formData[index].feedback
                      : ""
                  }
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <a
                  className="tertiary-btn"
                  onClick={(event) => handleSubmit(student, index)}
                >
                  <strong>Guardar cambios</strong>
                </a>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return <div style={{ width: "100%" }}>{generateAccordions()}</div>;
}

let mapStateToProps = (state) => {
  return {};
};

let mapDispatchToProps = (dispatch) => {
  return {
    submitEvaluation: (studentProductId, studentId, formData) =>
      dispatch(submitEvaluation(studentProductId, studentId, formData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Accordions);
