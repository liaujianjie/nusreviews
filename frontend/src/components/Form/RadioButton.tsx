import * as React from "react";
import { Form, Radio, Label, CheckboxProps } from "semantic-ui-react";
import { RadioButtonProps } from "./Form";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Field } from "react-final-form";

const RadioButton = (props: RadioButtonProps) => {
  return (
    <label>
      <Field
        name={props.name}
        value={props.value}
        component="input"
        type="radio"
      >
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
            const { name, value, checked } = eventData;
            const defaultEvent = {
              target: { name, value, checked }
            };
            input.onChange(defaultEvent);
          };

          return (
            <Form.Field>
              <Label>{props.children}</Label>
              <Radio {...neededInput} onChange={handleChange} />
            </Form.Field>
          );
        }}
      </Field>
    </label>
  );
};

export default RadioButton;
