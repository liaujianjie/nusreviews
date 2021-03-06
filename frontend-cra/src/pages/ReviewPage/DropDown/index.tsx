import * as React from "react";
import { HTMLSelect } from "@blueprintjs/core";

import * as FinalForm from "react-final-form";

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
  children?: React.ReactNode;
  options: Array<DropDownOptionObj>;
  placeholder: string;
}

export const FinalDropDown: React.FunctionComponent<
  FinalForm.FieldRenderProps<React.ReactText, HTMLSelectElement>
> = props => {
  const { multiple, onFocus, onBlur, ...neededProps } = props.input;
  return (
    <HTMLSelect
      className="FormHeader__dropdown"
      {...neededProps}
      {...props}
      large={true}
      minimal={true}
    />
  );
};

export const DropDown: React.FunctionComponent<DropDownProps> = props => {
  return (
    <div className="FormHeader__dropdown-container">
      <label>{props.label}</label>
      <FinalForm.Field component={FinalDropDown} type="input" {...props} />
    </div>
  );
};
