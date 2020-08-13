import React from "react";

import LinkList from "./links/LinkList";
import FileList from "./files/FileList";

import "./fileAndListContainer.css";

export default function FileAndLinkContainer(props) {
  return (
    <div className="file-link-container">
      <FileList
        assignment={props.assignment}
        assignmentType={props.assignmentType}
      />
      <LinkList
        assignment={props.assignment}
        assignmentType={props.assignmentType}
      />
    </div>
  );
}
