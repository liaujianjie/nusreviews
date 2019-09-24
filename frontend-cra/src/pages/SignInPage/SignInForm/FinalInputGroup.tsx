import React from "react";
import { InputGroup } from "@blueprintjs/core";
import { FieldRenderProps } from "react-final-form";

export const FinalInputGroup: React.FunctionComponent<
  FieldRenderProps<string, HTMLInputElement>
> = props => {
  return <InputGroup {...props} {...props.input} />;
};
