import * as React from "react";
import { Form, CheckboxProps } from "semantic-ui-react";

import { Field } from "react-final-form";

export interface RadioButtonProps {
  name: string;
  value?: string | number;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = props => {
  return (
    <Field name={props.name} value={props.value} component="input" type="radio">
      {({ input }) => {
        const { type, ...neededInput } = input;

        // because semantic UI sets provides a synthetic event as the first param
        const handleChange = (
          syntheticEvent: React.FormEvent<HTMLInputElement>,
          eventData: CheckboxProps
        ) => {
          const defaultEvent = { target: eventData };
          props.onClick && props.onClick();
          input.onChange(defaultEvent);
        };

        return <Form.Radio {...neededInput} onChange={handleChange} />;
      }}
    </Field>
  );
};

export default RadioButton;
