import React from "react";
import { InputGroup, Intent, Popover } from "@blueprintjs/core";
import { FieldRenderProps } from "react-final-form";

import "./style.css";

export const FinalInputGroup: React.FunctionComponent<
  FieldRenderProps<string, HTMLInputElement>
> = props => {
  let intent: Intent = "none";
  if (props.meta.dirty && props.meta.invalid) {
    intent = "danger";
  }
  if (props.meta.dirty && props.meta.valid) {
    intent = "success";
  }
  return (
    <Popover
      targetClassName="FinalInputGroup__popover-target"
      popoverClassName="FinalInputGroup__popove"
      position="right"
      isOpen={Boolean(
        props.meta.error && props.meta.dirty && props.meta.active
      )}
    >
      <InputGroup {...props} {...props.input} intent={intent} />
      <div style={{ padding: 16 }}>{props.meta.error}</div>
    </Popover>
  );
};
