import * as React from "react";
import { Form, CheckboxProps } from "semantic-ui-react";

import * as FinalForm from "react-final-form";

export interface RadioButtonProps {
  name: string;
  value?: string | number;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = props => {
  return (
    <FinalForm.Field
      name={props.name}
      value={props.value}
      component="input"
      type="radio"
    >
      {({ input }) => {
        const { type, onChange, ...neededInput } = input;

        // because semantic UI sets provides a synthetic event as the first param
        const handleChange = (
          syntheticEvent: React.FormEvent<HTMLInputElement>,
          eventData: CheckboxProps
        ) => {
          const defaultEvent = { target: eventData };
          props.onClick && props.onClick();
          onChange(defaultEvent);
        };

        return (
          <div>
            <Form.Radio {...neededInput} onChange={handleChange} />
            <label style={{ position: "relative", right: "50%", top: "1m" }}>
              {props.label}
            </label>
          </div>
        );
      }}
    </FinalForm.Field>
  );
};

export default RadioButton;
