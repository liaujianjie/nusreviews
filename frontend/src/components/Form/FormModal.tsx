import * as React from "react";
import { Modal } from "semantic-ui-react";
import LongTextInput from "./LongTextInput";
import * as FinalForm from "react-final-form";
import ActionButton from "../ActionButton";

interface TextFieldObj {
  name: string;
  question: string;
  placeholder: string;
  children?: React.ReactNode;
}
interface FormModalProps {
  open: boolean;
  formProps: TextFieldObj;
  children: React.ReactNode;
  onClose(): void;
}

interface FormValues {
  shortReviewOpinion?: string;
  shortReviewTip?: string;
}

export const FormModal = (props: FormModalProps) => {
  const { open, formProps, onClose } = props;

  const { question, ...longTextInputProps } = formProps;

  const wordLimit = 300;

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

  return (
    <FinalForm.Form onSubmit={onSubmit} validate={formValidation}>
      {({ values, invalid, form }) => {
        const formValue = values[formProps.name];
        return (
          <Modal
            open={open}
            onClose={onClose}
            size="tiny"
            trigger={props.children}
            style={{ top: "30%" }}
          >
            <Modal.Header>{question}</Modal.Header>
            <Modal.Content>
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

export default FormModal;
