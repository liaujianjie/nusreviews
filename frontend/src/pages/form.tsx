import * as React from "react";
import { withLayout } from "../components/Layout";
import { Form } from "react-final-form";
import { Button, Container, Header, Segment, Label } from "semantic-ui-react";
import RadioButton from "../components/Form/RadioButton";
import ShortTextInput from "../components/Form/ShortTextInput";
import { range } from "lodash";

import { LongFormReviewInput } from "../components/Form/Form";

const LongForm = () => {
  const onSubmit = (values: LongFormReviewInput) => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  const getScaledButtons = (scale, field) => {
    return range(scale).map(num => <RadioButton value={num} name={field} />);
  };

  return (
    <Container textAlign="center" text>
      <Header as="h2">CS3216 AY2019/2020 SEM 1</Header>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, form, values }) => (
          <form
            onSubmit={e => {
              handleSubmit(e);
              form.reset();
            }}
            className="ui form"
          >
            <Segment>
              <ShortTextInput
                name="expectedGrade"
                placeholder="A+"
                value={values.expectedGrade}
              >
                Expected Grade
              </ShortTextInput>
              <ShortTextInput
                name="actualGrade"
                placeholder="A+"
                value={values.actualGrade}
              >
                Actual Grade
              </ShortTextInput>
            </Segment>

            <div className="radio-button-test">
              <label>RadioButton test</label>
              <div>
                <Label>Avoid</Label>
                {getScaledButtons(5, "Lecturer")}
                <Label>Recommend</Label>
              </div>
            </div>

            <Button type="submit">Submit</Button>
          </form>
        )}
      </Form>
    </Container>
  );
};

export default withLayout(LongForm);
