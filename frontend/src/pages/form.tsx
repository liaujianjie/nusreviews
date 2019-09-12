import React, { Component } from "react";
import { withLayout } from "../components/Layout";
import { Container } from "semantic-ui-react";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Form, Field } from "react-final-form";
import RadioButton from "../components/Form/RadioButton";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const LongForm = () => {
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

          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  );
};

export default withLayout(LongForm);
