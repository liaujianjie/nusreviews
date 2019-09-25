import * as React from "react";
import { HTMLSelect } from "@blueprintjs/core";

import { Field } from "react-final-form";

interface DropDownOptionObj {
  key: string;
  value: string;
  text: string;
}

export interface DropDownProps {
  name: string;
  value?: string | number;
  label?: string;
  question: string;
  children?: React.ReactNode;
  options: Array<DropDownOptionObj>;
  placeholder: string;
}

const DropDown: React.FunctionComponent<DropDownProps> = props => {
  return (
    <Field {...props} component="select">
      {({ input }) => {
        const { children, ...neededProps } = props;

        return <HTMLSelect {...neededProps} onChange={input.onChange} />;
      }}
    </Field>
  );
};

export default DropDown;
