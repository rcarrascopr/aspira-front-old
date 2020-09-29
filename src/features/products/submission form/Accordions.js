import React, { useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function Accordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const generateAccordions = () => {
    return props.students.map((student, index) => {
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
              <strong>{student.name}</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <p className="dark-purple-text">Detalles de la entrega</p>
              <hr />
              <p className="dark-purple-text">Documentos subidos:</p>

              <p className="dark-purple-text">Retroalimentación</p>
              <p className="dark-purple-text">Habilidades</p>
              <hr />
            </div>
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return <div>{generateAccordions()}</div>;
}
