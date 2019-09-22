import * as React from "react";
import { range } from "lodash";
import { Form, Header, Grid } from "semantic-ui-react";
import RadioButton from "./RadioButton";

interface RadioGroupProps {
  scale: number;
  name: string;
  question: string;
  value: Array<string>;
}

const RadioButtonGroup: React.FunctionComponent<RadioGroupProps> = props => {
  const { scale, name, question, value } = props;
  const radioButtons = range(scale).map(num => (
    <RadioButton value={num} name={name} onClick={props.onClick} />
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
