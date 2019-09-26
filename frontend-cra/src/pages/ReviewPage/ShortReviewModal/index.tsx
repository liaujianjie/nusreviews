import * as React from "react";
import { Dialog, Button } from "@blueprintjs/core";
import RadioButtonGroup from "../../../components/RadioButtonGroup/index";
import * as FinalForm from "react-final-form";
import TextAreaInput from "../../../components/TextAreaInput";
import { FinalTextAreaGroup } from "../../../components/TextAreaInput/index";
import { postOpinion } from "../../../api/review";
import "./style.css";

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
    postOpinion(1, values);
    console.log("submitted!", values);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>{buttonName}</Button>
      <Dialog
        isOpen={open}
        onClose={onClose}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
      >
        <FinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit, invalid, form }) => {
            return (
              <div className="ShortReviewModal__container">
                <div className="ShortReviewModal__header">
                  <h2>{question}</h2>
                </div>
                <div className="ShortReviewModal__body">
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
                </div>
                <div className="ShortReviewModal__footer">
                  <Button onClick={(e: any) => onClose()} minimal={true}>
                    Continue Later
                  </Button>
                  <Button
                    onClick={(e: any) => {
                      handleSubmit();
                      form.reset();
                    }}
                    disabled={invalid}
                    type="submit"
                    className=""
                  >
                    Submit
                  </Button>
                </div>
              </div>
            );
          }}
        </FinalForm.Form>
      </Dialog>
    </div>
  );
};

export default ShortReviewModal;
