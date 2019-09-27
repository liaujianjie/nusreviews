import * as React from "react";

import { FormSegment } from "../FormSegment";
import { DropDown } from "../DropDown";

import "./style.css";

interface FormHeaderProps {
  moduleCode?: string;
  moduleSemester?: string;
  moduleDescription?: string;
}

export const FormHeader: React.FunctionComponent<FormHeaderProps> = props => {
  const { moduleCode, moduleDescription, moduleSemester } = props;
  return (
    <FormSegment bgColor="white">
      <div className="FormHeader__top-row-container">
        <div className="FormHeader__module-row">
          <div className="FormHeader__inline-container">
            <h1 className="FormHeader__module-code">{moduleCode}</h1>{" "}
            <h2 className="FormHeader__module-semester">{moduleSemester}</h2>
          </div>
          <div className="FormHeader__module-description">
            <h3>{moduleDescription}</h3>
          </div>
        </div>
        <div className="FormHeader__form-tip">
          <h4>Do as you wish, there are no compulsory fields</h4>
        </div>
      </div>
      <div className="FormHeader__bot-row-container">
        <DropDown
          name="expectedGrade"
          placeholder="-"
          options={GRADES}
          label="Expected Grade"
        />
        <DropDown
          name="actualGrade"
          placeholder="-"
          options={GRADES}
          label="Actual Grade"
        />
      </div>
    </FormSegment>
  );
};

const GRADES = [
  { key: "A+", text: "A+", value: "A+" },
  { key: "A", text: "A", value: "A" },
  { key: "A-", text: "A-", value: "A-" },
  { key: "B+", text: "B+", value: "B+" },
  { key: "B", text: "B", value: "B" },
  { key: "B-", text: "B-", value: "B-" },
  { key: "C+", text: "C+", value: "C+" },
  { key: "C", text: "C", value: "C" },
  { key: "C-", text: "C-", value: "C-" },
  { key: "D+", text: "D+", value: "D+" },
  { key: "D", text: "D", value: "D" },
  { key: "F", text: "F", value: "F" },
  { key: "S", text: "S", value: "S" },
  { key: "U", text: "U", value: "U" }
];


