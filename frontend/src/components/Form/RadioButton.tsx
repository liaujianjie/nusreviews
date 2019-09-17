import * as React from "react";
import { Form, CheckboxProps, Header, Grid } from "semantic-ui-react";
import { RadioButtonProps } from "./Form";
import { range } from "lodash";

import { Field } from "react-final-form";

interface RadioGroupProps {
  scale: number;
  name: string;
  question: string;
  value: Array<string>;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = props => {
  return (
    <Field name={props.name} value={props.value} component="input" type="radio">
      {fieldProps => {
        const { input } = fieldProps;
        const { type, ...neededInput } = input;

        // because semantic UI sets provides a synthetic event as the first param
        const handleChange = (
          syntheticEvent: React.FormEvent<HTMLInputElement>,
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

const RadioButtonGroup: React.FunctionComponent<RadioGroupProps> = props => {
  const { scale, name, question, value } = props;
  const radioButtons = range(scale).map(num => (
    <RadioButton value={num} name={name} />
  ));

  const radioButtonGroup = (
    <Grid verticalAlign="middle" style={{ justifyContent: "flex-end" }}>
      <Grid.Column width={4} textAlign="right">
        <label>{value[0]}</label>
      </Grid.Column>
      <Grid.Column style={{ width: "13em" }}>
        <Form.Group centered style={{ margin: "0px" }}>
          {radioButtons}
        </Form.Group>
      </Grid.Column>
      <Grid.Column width={4} textAlign="left">
        <label>{value[1]}</label>
      </Grid.Column>
    </Grid>
  );

  return (
    <Grid stackable>
      <Grid.Column width={6} floated="left">
        <Header as="h5">{question}</Header>
      </Grid.Column>
      <Grid.Column width={10} centered>
        {radioButtonGroup}
      </Grid.Column>
    </Grid>
  );
};

export default RadioButtonGroup;
