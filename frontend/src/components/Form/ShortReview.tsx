import * as React from "react";
import { Modal } from "semantic-ui-react";
import LongTextInput from "./LongTextInput";
import * as FinalForm from "react-final-form";
import ActionButton from "../ActionButton";

interface FormValues {
  shortReviewOpinion?: string;
  shortReviewTip?: string;
}

interface ShortReviewProps {
  buttonName: string;
  name: string;
  placeholder: string;
  question: string;
}

export const ShortReview = (props: ShortReviewProps) => {
  const [open, setOpen] = React.useState(false);
  const { buttonName, ...formProps } = props;

  const { question, ...longTextInputProps } = formProps;

  const wordLimit = 300;

  const onClose = () => setOpen(false);

  const onSubmit = (values: FormValues) => {
    window.alert("Form submitted!" + JSON.stringify(values, 0, 2));
    onClose();
  };

  const formValidation = (values: FormValues) => {
    const errors = {};
    const currentWords = values[formProps.name]; // done like this for the two different shortReviews
    if (currentWords && currentWords.length > wordLimit) {
      errors[formProps.name] = `only ${wordLimit} characters pls`;
    }
    return errors;
  };

  const modalTrigger = (
    <ActionButton
      onClick={() => setOpen(true)}
      icon="plus"
      name={buttonName}
      transparent={false}
    />
  );

  return (
    <FinalForm.Form onSubmit={onSubmit} validate={formValidation}>
      {({ values, invalid, form }) => {
        const formValue = values[formProps.name];
        return (
          <Modal
            open={open}
            onClose={onClose}
            trigger={modalTrigger}
            size="small"
            style={{ top: "30%" }}
          >
            <Modal.Header>{question}</Modal.Header>
            <Modal.Content style={{ paddingBottom: "0.5em" }}>
              <LongTextInput
                {...longTextInputProps}
                value={formValue}
                wordLimit={300}
              />
            </Modal.Content>
            <Modal.Actions>
              <ActionButton
                onClick={onClose}
                name="Cancel"
                transparent={true}
              />
              <ActionButton
                name="Add Opinion"
                transparent={false}
                onClick={() => {
                  onSubmit(values);
                  form.reset();
                }}
                disabled={!formValue || invalid}
              />
            </Modal.Actions>
          </Modal>
        );
      }}
    </FinalForm.Form>
  );
};

export default ShortReview;
