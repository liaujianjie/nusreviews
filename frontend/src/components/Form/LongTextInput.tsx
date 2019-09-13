import * as React from "react";
import { Form, TextAreaProps } from "semantic-ui-react";
import { LongTextInputProps } from "./Form";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Field } from "react-final-form";

const LongTextInput = (props: LongTextInputProps) => {
  return (
    <Field {...props} component="input" type="text">
      {fieldProps => {
        const { input } = fieldProps;
        const handleChange = (
          event: React.FormEvent<HTMLTextAreaElement>,
          eventData: TextAreaProps
        ) => {
          const defaultEvent = {
            target: { ...eventData }
          };
          input.onChange(defaultEvent);
        };

        return (
          <Form.TextArea
            label={props.children}
            placeholder={props.placeholder}
            onChange={handleChange}
            value={props.value ? props.value : ""}
          />
        );
      }}
    </Field>
  );
};

export default LongTextInput;
