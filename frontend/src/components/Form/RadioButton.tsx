import * as React from "react";
import { Form, CheckboxProps } from "semantic-ui-react";
import { RadioButtonProps } from "./Form";

import { Field } from "react-final-form";

const RadioButton = (props: RadioButtonProps) => {
  return (
    <Field name={props.name} value={props.value} component="input" type="radio">
      {fieldProps => {
        const { input } = fieldProps;
        const { type, ...neededInput } = input;

        // because semantic UI sets provides a synthetic event as the first param
        const handleChange = (
          event: React.FormEvent<HTMLInputElement>,
          eventData: CheckboxProps
        ) => {
          const defaultEvent = { target: eventData };
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
