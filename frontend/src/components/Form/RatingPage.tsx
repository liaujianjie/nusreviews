/*
What do we need to build this:
1. WizardPage - a Large component maintaing the page, each page should have a FinalForm component for validation
    - Props: onSave, onDraft, Module, Questions, ModuleDetails (how many students have done this form)
    - Should handle question string to RadioButtonGroup transition
    - Should handle RadioButtonGroup onClick to progressBar transformation
2. Wizard - Manage pagination, form submission and drafting, pass down these Axios calls to each page
3. 

*/

import * as React from "react";
import * as FinalForm from "react-final-form";
import RadioButtonGroup from "./RadioButtonGroup";
import ActionButton from "../ActionButton";
import { Segment, Modal, Header, Radio } from "semantic-ui-react";
import { RadioButtonProps } from "./RadioButton";

interface RatingPageProps {
  questions: Array<RadioButtonProps>;
  questionsPerPage: number;
  moduleName: string;
  lastPage: boolean;
  onSubmit: Function;
  onClsoe: Function;
}

export const RatingPage: React.FunctionComponent<RatingPageProps> = props => {
  const { lastPage, questions, moduleName, onClose } = props;

  const onSubmit = values => {
    window.alert("Form submitted!" + JSON.stringify(values, 0, 2));
    props.onSubmit();
  };

  const formValidation = values => {
    return Object.keys(values).length !== questions.length
      ? "not all fields are filled"
      : undefined;
  };

  const getQuestions = () => {
    return questions.map(question => (
      <RadioButtonGroup {...question} modal={true} />
    ));
  };

  return (
    <FinalForm.Form onSubmit={onSubmit} validate={formValidation}>
      {({ values, invalid, form, pristine }) => {
        return (
          <>
            <Segment basic style={{ padding: "2em 2em 0em 2em" }}>
              <Header as="h3">{moduleName}</Header>
              <span>Help your fellow students out please!</span>
              <Segment basic>{getQuestions()}</Segment>
            </Segment>
            <Modal.Actions>
              <ActionButton
                onClick={onClose}
                name="Continue Later"
                transparent={true}
              />
              <ActionButton
                name={lastPage ? "Submit" : "Continue"}
                transparent={false}
                onClick={() => {
                  onSubmit(values);
                  form.reset();
                }}
                disabled={pristine || invalid}
              />
            </Modal.Actions>
          </>
        );
      }}
    </FinalForm.Form>
  );
};

export default RatingPage;
