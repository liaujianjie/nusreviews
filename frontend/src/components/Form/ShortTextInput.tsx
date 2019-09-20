import * as React from "react";
import { Form, InputProps } from "semantic-ui-react";

import { Field } from "react-final-form";

export interface ShortTextInputProps {
  name: string;
  value?: string | number;
  label?: string;
  question: string;
  children?: React.ReactNode;
  placeholder: string;
}

const ShortTextInput: React.FunctionComponent<ShortTextInputProps> = props => {
  return (
    <Field {...props} component="input" type="text">
      {fieldProps => {
        const { input } = fieldProps;
        const handleChange = (
          event: React.FormEvent<HTMLInputElement>,
          eventData: InputProps
        ) => {
          const defaultEvent = { target: eventData };
          input.onChange(defaultEvent);
        };

        return (
          <Form.Input
            label={props.question}
            placeholder={props.placeholder}
            onChange={handleChange}
            value={props.value || ""}
          />
        );
      }}
    </Field>
  );
};

export default ShortTextInput;
