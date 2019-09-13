import * as React from "react";
import { Form, InputProps } from "semantic-ui-react";
import { ShortTextInputProps } from "./Form";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Field } from "react-final-form";

const ShortTextInput = (props: ShortTextInputProps) => {
  console.log("shorttext input", props.value);
  return (
    <Field name={props.name} value={props.value} component="input" type="text">
      {fieldProps => {
        const { input } = fieldProps;
        const { type, ...neededInput } = input;

        const handleChange = (
          event: React.FormEvent<HTMLInputElement>,
          eventData: InputProps
        ) => {
          const defaultEvent = {
            target: { ...eventData }
          };
          input.onChange(defaultEvent);
        };

        return (
          <Form.Group>
            <Form.Input
              label="Expected Grade"
              placeholder="A+"
              onChange={handleChange}
              value={props.value ? props.value : ""}
            />
          </Form.Group>
        );
      }}
    </Field>
  );
};

export default ShortTextInput;
