import * as React from "react";
import { withLayout } from "../components/Layout";
import { Form } from "react-final-form";
import { Button } from "semantic-ui-react";
import RadioButton from "../components/Form/RadioButton";
import ShortTextInput from "../components/Form/ShortTextInput";

import { LongFormReviewInput } from "../components/Form/Form";

const LongForm = () => {
  const onSubmit = (values: LongFormReviewInput) => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, form, values }) => (
        <form
          onSubmit={e => {
            handleSubmit(e);
            form.reset();
          }}
          className="ui form"
        >
          <div className="radio-button-test">
            <label>RadioButton test</label>
            <div>
              <RadioButton name="test" value="first" label="First">
                First
              </RadioButton>
              <RadioButton name="test" value="second" label="Second">
                Second
              </RadioButton>
              <RadioButton name="test" value="third" label="Third">
                Third
              </RadioButton>
            </div>
          </div>

          <div className="short-text-field-test">
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
          </div>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Form>
  );
};

export default withLayout(LongForm);
