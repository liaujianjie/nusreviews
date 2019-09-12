import React, { Component } from "react";
import { withLayout } from "../Layout";
import { Container, Form, Radio, Label } from "semantic-ui-react";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Field } from "react-final-form";

interface RadioButtonProps {
  name: string;
  value: string;
  children?: any;
}

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
          const handleChange = (e, data) => {
            // necessary because semantic UI sets e as a synthetic event which uses a different structure then the default event, which
            // react-final-form needs
            console.log(data);
            const event = { target: { value: data.value, name: data.name } };
            input.onChange(event);
          };
          return (
            <Form.Field>
              <Label onChange={handleChange}>{props.children}</Label>
              <Radio
                checked={input.checked}
                value={input.value}
                name={input.name}
                onChange={handleChange}
              />
            </Form.Field>
          );
        }}
      </Field>
    </label>
  );

  return (
    <label>
      <Field
        name={props.name}
        value={props.value}
        component="input"
        type="radio"
      >
        {({ input }) => {
          console.log(input.onChange);
          return (
            <Radio
              label={props.children}
              name={input.name}
              value={input.value}
              checked={input.checked}
              onChange={e => input.onChange(e)}
            />
          );
        }}
      </Field>
      {props.children}
    </label>
  );
};

export default RadioButton;
