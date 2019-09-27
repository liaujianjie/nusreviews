import React from "react";
import * as _ from "lodash";

import * as FinalForm from "react-final-form";
import { Button } from "@blueprintjs/core";

import { RequiresAuth } from "../../components/RequiresAuth";
import { FormHeader } from "./FormHeader/index";
import { Metrics } from "./Metrics/index";
import { Questions } from "./Questions/index";

import {
  reviewTemplate,
  getQuestions,
  Metric,
  Question,
  postReview
} from "../../api/review";

import "./style.css";

export const ReviewPage: React.FunctionComponent = () => {
  const [questions, setQuestions] = React.useState({
    metricTemplates: reviewTemplate.metricTemplates as Array<Metric>,
    questionTemplates: reviewTemplate.questionTemplates as Array<Question>
  });

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const payload = await getQuestions();
      setQuestions({ ...payload });
    };
    fetchQuestions();
  }, []);

  const updateValues = (values: any) => {
    const nonEmpty = Object.keys(values);
    console.log(nonEmpty, "non empty check");
    const { metricTemplates, questionTemplates } = questions;
    const nonEmptyMetric = metricTemplates
      .filter((m: Metric) => nonEmpty.includes(m.name))
      .map((m: Metric) => {
        m.value = values[m.name];
        return m;
      });
    const nonEmptyQuestion = questionTemplates
      .filter((qn: Question) => nonEmpty.includes(qn.question))
      .map((qn: Question) => {
        qn.answer = values[qn.question];
        return qn;
      });
    return {
      metricTemplates: nonEmptyMetric,
      questionTemplates: nonEmptyQuestion
    };
  };

  const parsePayload = (payload: any) => {
    const {
      expectedGrade,
      actualGrade,
      metricTemplates,
      questionTemplates
    } = payload;
    const metrics = metricTemplates
      .map((m: any) => ({
        metricTemplate: m.id,
        value: parseInt(m.value)
      }))
      .filter((m: any) => m.value !== undefined);
    const questions = questionTemplates
      .map((q: any) => ({
        questionTemplate: q.id,
        answer: q.answer
      }))
      .filter((q: any) => q.answer !== undefined);
    return {
      expectedGrade: GRADES_TO_INT(expectedGrade),
      actualGrade: GRADES_TO_INT(actualGrade),
      metrics,
      questions
    };
  };

  const onSubmit = (values: any) => {
    const { expectedGrade, actualGrade, ...otherValues } = values;
    const nonEmpty = updateValues(otherValues);
    console.log(nonEmpty);
    const payload = parsePayload({ ...nonEmpty, expectedGrade, actualGrade });
    console.log(payload);
    postReview(1, payload);
  };

  return (
    <RequiresAuth>
      <FinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormHeader
              moduleCode="cs3216"
              moduleDescription="AY2019/2020, SEM1"
              moduleSemester="Software Engineering for Digital Markets"
            />
            <div className="RatingForm__questions-container">
              <Metrics metrics={questions.metricTemplates} />
            </div>
            <div className="RatingForm__questions-container">
              <Questions questions={questions.questionTemplates} />
            </div>
            <Button
              className="RatingForm__button"
              type="submit"
              intent="primary"
            >
              Submit Review
            </Button>
          </form>
        )}
      </FinalForm.Form>
    </RequiresAuth>
  );
};

const GRADES_TO_INT = (
  grade:
    | "A+"
    | "A"
    | "A-"
    | "B+"
    | "B"
    | "B-"
    | "C+"
    | "C"
    | "C-"
    | "D+"
    | "D"
    | "F"
    | "S"
    | "U"
) => {
  const trans = {
    "A+": 0,
    A: 1,
    "A-": 2,
    "B+": 3,
    B: 4,
    "B-": 5,
    "C+": 6,
    C: 7,
    "C-": 8,
    "D+": 9,
    D: 10,
    F: 11,
    S: 12,
    U: 13
  };
  return trans[grade];
};
