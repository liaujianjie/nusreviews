import * as React from "react";
import * as _ from "lodash";
import * as FinalForm from "react-final-form";

import { Dialog, Button } from "@blueprintjs/core";

import { RadioButtonGroup } from "../../../components/RadioButtonGroup/index";
import { Metric, postRatings, updateTemplate } from "../../../api/review";

import "./style.css";

interface RatingModalProps {
  buttonName: string;
  moduleCode: string;
  metrics: Array<Metric>;
}

export const RatingModal: React.FunctionComponent<RatingModalProps> = props => {
  const [open, setOpen] = React.useState(false);
  const [pageNum, setPageNum] = React.useState(0);
  const { metrics } = props;
  const metricsPerPage = 4;

  const lastPage = Math.ceil(metrics.length / metricsPerPage) === pageNum + 1;

  const metricSegment = _.chunk(metrics, metricsPerPage);

  const currMetrics = metricSegment[pageNum];

  const onClose = () => setOpen(false);
  const nextPage = () => setPageNum(pageNum + 1);

  const parsePayload = (values: any) => {
    const payload = [];
    for (let [key, value] of Object.entries(values)) {
      const metricTemplate = metrics.find(m => m.name === key) as any;
      payload.push({
        metricTemplate: metricTemplate.id,
        value: parseInt(value as string)
      });
    }
    return { metrics: payload };
  };

  const onSubmit = (values: any) => {
    postRatings(1, parsePayload(values));
    lastPage ? onClose() : nextPage();
  };

  const formValidation = (values: any) => {
    const msg =
      Object.keys(values).length !== currMetrics.length
        ? "not all fields are filled"
        : undefined;

    const error = msg ? { errorMsg: msg } : undefined;
    return error;
  };

  const { buttonName, moduleCode } = props;

  const getQuestions = () => {
    return currMetrics.map(qn => <RadioButtonGroup {...qn} mobile={true} />);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        icon="plus"
        intent="primary"
        text="Add Rating"
      />
      <Dialog
        isOpen={open}
        onClose={onClose}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        className="RatingModal"
      >
        <FinalForm.Form onSubmit={onSubmit} validate={formValidation}>
          {({ handleSubmit, invalid, form, pristine }) => {
            return (
              <div className="RatingModal__container">
                <div className="RatingModal__header">
                  <h2>
                    How was{" "}
                    <span className="RatingModal__module-code">
                      {moduleCode}
                    </span>
                  </h2>
                  <div>
                    Hey help your XXX friends out over here, and drop a quick
                    rating!!
                  </div>
                </div>
                <div className="RatingModal__body">{getQuestions()}</div>
                <div className="RatingModal__footer">
                  <Button onClick={(e: any) => onClose()} minimal={true}>
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
