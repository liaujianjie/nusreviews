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
          const defaultEvent = {
            target: { ...eventData }
          };
          input.onChange(defaultEvent);
        };

        return (
          <Form.Dropdown
            label={props.children}
            options={props.options}
            placeholder={props.placeholder}
            onChange={handleChange}
            value={props.value ? props.value : ""}
          />
        );
      }}
    </Field>
  );
};

export default DropDown;
