import * as React from "react";
import { Dialog, Button } from "@blueprintjs/core";
import { reviewTemplate, getQuestions } from "../../../api/review";
import * as _ from "lodash";
import RadioButtonGroup from "../../../components/RadioButtonGroup/index";
import * as FinalForm from "react-final-form";
import "./style.css";

interface RatingModalProps {
  buttonName: string;
}

interface Question {
  name: string;
  minValue: number;
  maxValue: number;
  minDescription: string;
  maxDescription: string;
  compulsory: boolean;
}

export const RatingModal: React.FunctionComponent<RatingModalProps> = props => {
  const [open, setOpen] = React.useState(false);
  const [pageNum, setPageNum] = React.useState(0);
  const questions = reviewTemplate.metricTemplates;
  const questionsPerPage = 4;

  const lastPage =
    Math.ceil(questions.length / questionsPerPage) === pageNum + 1;

  const questionSegment = _.chunk(questions, questionsPerPage);

  const currQuestions = questionSegment[pageNum];

  const onClose = () => setOpen(false);
  const nextPage = () => setPageNum(pageNum + 1);

  const onSubmit = () => {
    console.log("submitted!");
    lastPage ? onClose() : nextPage();
  };

  const formValidation = (values: any) => {
    const msg =
      Object.keys(values).length !== currQuestions.length
        ? "not all fields are filled"
        : undefined;

    const error = msg ? { errorMsg: msg } : undefined;
    console.log(error);
    console.log(values);
    console.log(currQuestions);

    return error;
  };

  const { buttonName } = props;

  const getQuestions = () => {
    return currQuestions.map(qn => <RadioButtonGroup {...qn} />);
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
        <FinalForm.Form onSubmit={onSubmit} validate={formValidation}>
          {({ handleSubmit, invalid, form, pristine }) => {
            return (
              <div className="RatingModal__container">
                <div className="RatingModal__header">
                  {"CS3216"}
                  <span>
                    Hey help your XXX friends out over here, and drop a quick
                    rating!!
                  </span>
                </div>
                <div className="RatingModal__body">{getQuestions()}</div>
                <div className="RatingModal__footer">
                  <Button onClick={(e: any) => onClose()}>
                    Continue Later
                  </Button>
                  <Button
                    onClick={(e: any) => {
                      handleSubmit();
                      form.reset();
                    }}
                    disabled={invalid || pristine}
                  >
                    {lastPage ? "Submit" : "Next"}
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

export default RatingModal;