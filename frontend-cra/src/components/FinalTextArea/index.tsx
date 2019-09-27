import React from "react";
import { TextArea, Intent, Popover } from "@blueprintjs/core";
import { FieldRenderProps } from "react-final-form";

import "./style.css";

export const FinalTextArea: React.FunctionComponent<
  FieldRenderProps<string, HTMLTextAreaElement>
> = props => {
  let intent: Intent = "none";
  // if (props.meta.dirty && props.meta.invalid) {
  //   intent = "danger";
  // }
  // if (props.meta.dirty && props.meta.valid) {
  //   intent = "success";
  // }
  return (
    <Popover
      targetClassName="FinalTextArea__popover-target"
      popoverClassName="FinalTextArea__popove"
      position="top-left"
      isOpen={Boolean(
        props.meta.error && props.meta.dirty && props.meta.active
      )}
    >
      <TextArea {...props} {...props.input} intent={intent} fill />
      <div style={{ padding: 16 }}>{props.meta.error}</div>
    </Popover>
  );
};
