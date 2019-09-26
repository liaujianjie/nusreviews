import * as React from "react";
import * as FinalForm from "react-final-form";

import { Dialog, Button } from "@blueprintjs/core";

import { FinalTextAreaGroup } from "../../../components/TextAreaInput/index";
import { postOpinion } from "../../../api/review";

import "./style.css";

interface ShortReviewProps {
  buttonName: string;
  name: string;
  placeholder: string;
  question: string;
}

export const ShortReviewModal: React.FunctionComponent<
  ShortReviewProps
> = props => {
  const [open, setOpen] = React.useState(false);
  const { buttonName, question, placeholder } = props;
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
        className="ShortReviewModal__modal"
      >
        <FinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit, invalid, form }) => {
            return (
              <div className="ShortReviewModal__container">
                <div className="ShortReviewModal__header">
                  <h3>{question}</h3>
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
                  <Button
                    onClick={(event: React.MouseEvent<HTMLElement>) =>
                      onClose()
                    }
                    minimal={true}
                  >
                    Continue Later
                  </Button>
                  <Button
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
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
