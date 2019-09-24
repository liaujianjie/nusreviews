import * as React from "react";
import * as FinalForm from "react-final-form";
import RadioButtonGroup from "./RadioButtonGroup";
import ActionButton from "../ActionButton";
import { Modal, Header } from "semantic-ui-react";
import { RadioFormQuestion } from "../../pages/form";

interface RatingPageProps {
  questions: Array<RadioFormQuestion>;
  moduleName: string;
  lastPage: boolean;
  onSubmit: Function;
  onClose: Function;
}

export const RatingPage: React.FunctionComponent<RatingPageProps> = props => {
  const { lastPage, questions, moduleName, onClose } = props;

  React.useEffect(() => {
    // body tag needs to be set to scrolling, but somehow there's another semantic lifecycle that is overriding this
    document.body.classList.add("scrolling");
    return () => {
      document.body.classList.remove("scrolling");
    };
  });

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
            <Modal.Content scrolling style={{ paddingBottom: "0" }}>
              <div>
                <div style={{ textAlign: "center", paddingBottom: "1em" }}>
                  <Header as="h3">
                    How was{" "}
                    <Header
                      as="h3"
                      color="orange"
                      style={{ display: "inline" }}
                    >
                      {moduleName}
                    </Header>
                    ?
                  </Header>
                  <div style={{ padding: "0em 0.3em 0.6em" }}>
                    <b>43 other students</b> have been searching for reviews on
                    this module for the past week, let them know what you think!
                  </div>
                  <div>(your ratings will be kept confidential!)</div>
                </div>
                <div>{getQuestions()}</div>
              </div>
            </Modal.Content>
            <Modal.Actions
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
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
