import * as React from "react";
import { Form, Radio, Label, CheckboxProps } from "semantic-ui-react";
import { RadioButtonProps } from "./Form";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Field } from "react-final-form";

const RadioButton = (props: RadioButtonProps) => {
  return (
    <Field name={props.name} value={props.value} component="input" type="radio">
      {fieldProps => {
        const { input } = fieldProps;
        const { type, ...neededInput } = input;

        const handleChange = (
          event: React.FormEvent<HTMLInputElement>,
          eventData: CheckboxProps
        ) => {
          // necessary because semantic UI sets provides a synthetic event as the first param
          // which uses a different structure from the default event that react-final-form uses
          // Semantic UI however provides a second param, eventData which provides most of the relevant event data
          const defaultEvent = {
            target: { ...eventData }
          };
          input.onChange(defaultEvent);
        };

        return (
          <Form.Radio
            label={props.label}
            {...neededInput}
            onChange={handleChange}
          />
        );
      }}
    </Field>
  );
};

export default RadioButton;
