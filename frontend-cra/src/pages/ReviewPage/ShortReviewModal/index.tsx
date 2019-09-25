import * as React from "react";
import { Dialog, Button } from "@blueprintjs/core";
import RadioButtonGroup from "../../../components/RadioButtonGroup/index";
import * as FinalForm from "react-final-form";
import TextAreaInput from "../../../components/TextAreaInput";
import { FinalTextAreaGroup } from "../../../components/TextAreaInput/index";

interface ShortReviewProps {
  buttonName: string;
  name: string;
  placeholder: string;
  question: string;
}

interface FormValues {
  shortReviewOpinion?: string;
  shortReviewTip?: string;
}

export const ShortReviewModal: React.FunctionComponent<
  ShortReviewProps
> = props => {
  const [open, setOpen] = React.useState(false);
  const { buttonName, question, name, placeholder } = props;
  const onClose = () => setOpen(false);

  const onSubmit = (values: any) => {
    console.log("submitted!", values);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{buttonName}</Button>
      <Dialog isOpen={open}>
        <FinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit, invalid, form }) => {
            return (
              <div className="ShortReviewModal__container">
                <h2>{question}</h2>
                <FinalForm.Field
                  type="textarea"
                  component={FinalTextAreaGroup}
                  name={question}
                  placeholder={placeholder}
                  validate={value =>
                    value
                      ? value.length > 300 && "300 characters or less!"
                      : undefined
                  }
                />
                <Button onClick={(e: any) => onClose()}>Continue Later</Button>
                <Button
                  onClick={(e: any) => {
                    handleSubmit();
                    form.reset();
                  }}
                  disabled={invalid}
                >
                  Submit
                </Button>
              </div>
            );
          }}
        </FinalForm.Form>
      </Dialog>
    </div>
  );
};

export default ShortReviewModal;
