import * as React from "react";
import { range } from "lodash";
import { Form, Header, Grid, Responsive } from "semantic-ui-react";
import RadioButton from "./RadioButton";

export interface RadioGroupProps {
  scale: number;
  name: string;
  question: string;
  label: Array<string>;
  onClick?: Function;
}

const RadioButtonGroup: React.FunctionComponent<RadioGroupProps> = props => {
  const { scale, name, question, label, modal } = props;
  const radioButtons = (size: string) =>
    range(scale).map(num => {
      return (
        <RadioButton
          value={num}
          name={name}
          label={
            size === "mobile" &&
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
            justifyContent: "space-evenly"
          }}
          unstackable
        >
          {radioButtons("laptop")}
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
        // margin: "auto",
        display: "flex",
        justifyContent: "space-between"
        // maxWidth: "40em"
      }}
    >
      {radioButtons("mobile")}
    </Form.Group>
  );

  const radioButtonGroup = (
    <>
      <Responsive minWidth={768}> {horizontalGroup}</Responsive>
      <Responsive maxWidth={767} style={{ width: "100%" }}>
        {verticalGroup}
      </Responsive>
    </>
  );
  if (modal) {
    console.log("modal");
    return (
      <div style={{ maxWidth: "28em", marginBottom: "1em" }}>
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

/*
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
    <Grid
      verticalAlign="middle"
      style={{ justifyContent: "flex-end" }}
      stackable
    >
      <Grid.Row>
        <Grid>
          <Grid.Column width={8} textAlign="right">
            <label>{value[0]}</label>
          </Grid.Column>
          <Grid.Column width={8} textAlign="left">
            <label>{value[1]}</label>
          </Grid.Column>
        </Grid>
      </Grid.Row>
      <Grid.Row style={{ minWidth: "13em" }} width={5}>
        <Form.Group
          unstackable
          style={{ margin: "0px", display: "flex", justifyContent: "center" }}
        >
          {radioButtons}
        </Form.Group>
      </Grid.Row>
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



*/
