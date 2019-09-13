import * as React from "react";
import { withLayout } from "../components/Layout";
import { Form } from "react-final-form";
import { Button } from "semantic-ui-react";
import RadioButton from "../components/Form/RadioButton";
import { LongFormReviewInput } from "../components/Form/Form";

const LongForm = () => {
  const onSubmit = (values: LongFormReviewInput) => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form">
          <div>
            <label>RadioButton test</label>
            <div>
              <RadioButton name="test" value="first">
                First
              </RadioButton>
              <RadioButton name="test" value="second">
                Second
              </RadioButton>
              <RadioButton name="test" value="third">
                Third
              </RadioButton>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Form>
  );
};

export default withLayout(LongForm);
