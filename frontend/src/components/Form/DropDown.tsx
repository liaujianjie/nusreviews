import * as React from "react";
import { Form, TextAreaProps } from "semantic-ui-react";
import { DropDownProps } from "./Form";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Field } from "react-final-form";

const DropDown = (props: DropDownProps) => {
  return (
    <Field {...props} component="input" type="text">
      {fieldProps => {
        const { input } = fieldProps;
        const handleChange = (
          event: React.FormEvent<HTMLTextAreaElement>,
          eventData: TextAreaProps
        ) => {
          const defaultEvent = { target: eventData };
          input.onChange(defaultEvent);
        };

        const { children, ...neededProps } = props;

        return (
          <Form.Dropdown
            {...neededProps}
            label={props.children}
            onChange={handleChange}
          />
        );
      }}
    </Field>
  );
};

export default DropDown;
