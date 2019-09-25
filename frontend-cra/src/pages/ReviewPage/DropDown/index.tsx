import * as React from "react";
import { HTMLSelect } from "@blueprintjs/core";

import { Field } from "react-final-form";

import "./style.css";

interface DropDownOptionObj {
  key: string;
  value: string;
  text: string;
}

export interface DropDownProps {
  name: string;
  value?: string | number;
  label?: string;
  // question: string;
  children?: React.ReactNode;
  options: Array<DropDownOptionObj>;
  placeholder: string;
}

const DropDown: React.FunctionComponent<DropDownProps> = props => {
  return (
    <Field {...props} component="select">
      {({ input }) => {
        const { children, label, ...neededProps } = props;

        return (
          <div className="FormHeader__dropdown-container">
            <label>{label}</label>
            <HTMLSelect
              className="FormHeader__dropdown"
              {...neededProps}
              onChange={input.onChange}
              large={true}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default DropDown;
