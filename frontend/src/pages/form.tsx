import * as React from "react";
import { range } from "lodash";
// external component libraries
import * as Final from "react-final-form";
import { Form, Container, Header, Grid, Label } from "semantic-ui-react";
// components
import { withLayout } from "../components/Layout";
import RadioButton from "../components/Form/RadioButton";
import LongTextInput from "../components/Form/LongTextInput";
import ShortTextInput from "../components/Form/ShortTextInput";
import DropDown from "../components/Form/DropDown";
// interfaces
import { LongFormReviewInput } from "../components/Form/Form";
// constants
import { grades } from "../constants/Form";

const LongForm = () => {
  const onSubmit = (values: LongFormReviewInput) => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  const getRadioButtonGroup = (scale: number, field: string) => {
    return range(scale).map(num => (
      <Grid.Column>
        <RadioButton value={num} name={field} />
      </Grid.Column>
    ));
  };

  return (
    <Container textAlign="center" text fluid>
      <Header as="h2">CS3216 AY2019/2020 SEM 1</Header>
      <Final.Form onSubmit={onSubmit}>
        {({ handleSubmit, form, values }) => (
          <Form
            onSubmit={e => {
              handleSubmit(e);
              form.reset();
            }}
          >
            <Form.Group inline style={{ justifyContent: "center" }}>
              <Header as="h5">How was the Lecturer?</Header>
              <Label basic>Avoid</Label>
              {getRadioButtonGroup(5, "Lecturer")}
              <Label basic>Recommend</Label>
            </Form.Group>

            <Form.Group>
              <ShortTextInput
                name="name"
                placeholder="Name"
                value={values.name}
              >
                Name
              </ShortTextInput>
              <ShortTextInput
                name="realName"
                placeholder="RealName"
                value={values.realName}
              >
                Real Name
              </ShortTextInput>
            </Form.Group>

            <LongTextInput
              name="description"
              placeholder="The world was gonna roll me"
              value={values.description}
            >
              SOMEBODY ONCE TOLD ME
            </LongTextInput>

            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        )}
      </Final.Form>
    </Container>
  );
};

export default withLayout(LongForm);
