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
  // question: string;
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
      {...props}
      {...neededProps}
      // onChange={input.onChange}
      large={true}
      minimal={true}
    />
  );
};

const DropDown: React.FunctionComponent<DropDownProps> = props => {
  return (
    <div className="FormHeader__dropdown-container">
      <label>{props.label}</label>
      <FinalForm.Field component={FinalDropDown} type="input" {...props} />
    </div>
  );
  // return (
  //   <FinalForm.Field {...props} component="select">
  //     {({ input }) => {
  //       const { children, label, ...neededProps } = props;

  //       return (
  //         <div className="FormHeader__dropdown-container">
  //           <label>{label}</label>
  //           <HTMLSelect
  //             className="FormHeader__dropdown"
  //             {...neededProps}
  //             onChange={input.onChange}
  //             large={true}
  //             minimal={true}
  //           />
  //         </div>
  //       );
  //     }}
  //   </FinalForm.Field>
  // );
};

export default DropDown;
