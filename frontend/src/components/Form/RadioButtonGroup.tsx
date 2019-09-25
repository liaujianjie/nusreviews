import * as React from "react";
import * as _ from "lodash";
import { Form, Header, Grid, Responsive } from "semantic-ui-react";
import RadioButton from "./RadioButton";

export interface RadioGroupProps {
  scale: number;
  name: string;
  question: string;
  label: Array<string>;
  modal?: boolean;
  onClick?: Function;
}

const RadioButtonGroup: React.FunctionComponent<RadioGroupProps> = props => {
  const { scale, name, question, label, modal } = props;
  const radioButtons = (buttonLabel: boolean) =>
    _.range(scale).map(num => {
      return (
        <RadioButton
          value={num}
          name={name}
          label={
            buttonLabel &&
            (num === 0 ? label[0] : num === scale - 1 ? label[1] : undefined)
          }
          onClick={props.onClick} // this is for the click then change to bar thing
        />
      );
    });

  const horizontalGroup = (
    <Grid
      verticalAlign="middle"
      style={{ justifyContent: "flex-end" }}
      stackable
    >
      <Grid.Column width={5} textAlign="right">
        <label>{label[0]}</label>
      </Grid.Column>
      <Grid.Column width={5} style={{ minWidth: "13em" }}>
        <Form.Group
          style={{
            margin: "0px",
            display: "flex",
            justifyContent: "space-between"
          }}
          unstackable
        >
          {radioButtons(false)}
        </Form.Group>
      </Grid.Column>
      <Grid.Column width={4} textAlign="left">
        <label>{label[1]}</label>
      </Grid.Column>
    </Grid>
  );

  const verticalGroup = (
    <Form.Group
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0em 2em"
      }}
    >
      {radioButtons(true)}
    </Form.Group>
  );

  const radioButtonGroup = (
    <>
      <Responsive minWidth={768}> {horizontalGroup}</Responsive>
      <Responsive maxWidth={767}>{verticalGroup}</Responsive>
    </>
  );

  if (modal) {
    return (
      <div style={{ maxWidth: "80%", margin: "auto auto 1.5em" }}>
        <Header as="h5">{question}</Header>
        {verticalGroup}
      </div>
    );
  } else {
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
  }
};

export default RadioButtonGroup;
