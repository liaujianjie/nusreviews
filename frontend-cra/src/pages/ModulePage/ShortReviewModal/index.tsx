import * as React from "react";
import * as FinalForm from "react-final-form";

import { Dialog, Button } from "@blueprintjs/core";

import { FinalTextAreaGroup } from "../../../components/TextAreaInput/index";
import { postOpinion, postTip } from "../../../api/review";

import "./style.css";

interface ShortReviewProps {
  type: string;
  buttonName: string;
  name: string;
  placeholder: string;
  question: string;
  msId: number;
}

export const ShortReviewModal: React.FunctionComponent<
  ShortReviewProps
> = props => {
  const [open, setOpen] = React.useState(false);
  const { buttonName, question, placeholder, type, msId } = props;
  const onClose = () => setOpen(false);

  const onSubmit = (values: any) => {
    if (type === "tip") {
      postTip(msId, values);
    } else {
      postOpinion(msId, values);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        icon="plus"
        intent="primary"
        text={buttonName}
      />
      <Dialog
        isOpen={open}
        onClose={onClose}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        className="ShortReviewModal__modal"
      >
        <FinalForm.Form onSubmit={onSubmit}>
          {({ handleSubmit, invalid, form, pristine }) => {
            return (
              <div className="ShortReviewModal__container">
                <div className="ShortReviewModal__header">
                  <h3>{question}</h3>
                </div>

                <div className="ShortReviewModal__body">
                  <FinalForm.Field
                    type="textarea"
                    component={FinalTextAreaGroup}
                    name="description"
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
                    disabled={invalid || pristine}
                    type="submit"
                    intent="primary"
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
