import React from "react";

import { Section } from "../Section";

import { Checkbox } from "@blueprintjs/core";

import "./style.css";

type OwnProps = {
  moduleCode: string;
  title: string;
  description: string;
  allSemesters: Array<string>,
  semesters: Set<string>,
  toggleSemesterCheckbox: (semester: string) => void;
};

export const DetailSection: React.FunctionComponent<OwnProps> = ({
  moduleCode,
  title,
  description,
  allSemesters,
  semesters,
  toggleSemesterCheckbox,
}) => {
  return (
    <Section
      leftHeader={
        <div className="DetailSection__header-container">
          <h1>{moduleCode}</h1>
          <h3>{title}</h3>
        </div>
      }
      body={
        <div>
          <p>{description}</p><br/>
          <h4>{"Reviews for:"}</h4>
          <div className="DetailSection__semester-checkboxes">
          {
            !allSemesters.length
            ? <p>No available semesters</p>
            : allSemesters.map(element => <Checkbox checked={semesters.has(element)} label={element} onChange={() => toggleSemesterCheckbox(element)}/>)
          }
          </div>
        </div>
      }
    />
  );
};
