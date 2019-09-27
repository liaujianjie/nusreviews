import React from "react";
import * as _ from "lodash";

import { useRouter } from "../../hooks/useRouter";
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
import { GRADES_TO_INT } from '../../constants/grade';

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

  const router = useRouter();
  const { semesterId } = router.match.params as { semesterId: number };
  const onSubmit = (values: any) => {
    const { expectedGrade, actualGrade, ...otherValues } = values;
    const nonEmpty = updateValues(otherValues);
    const payload = parsePayload({ ...nonEmpty, expectedGrade, actualGrade });
    postReview(semesterId, payload);
  };

  return (
    <RequiresAuth>
      <FinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit, invalid, pristine }) => (
          <div className="ReviewPage__container">
            <form onSubmit={handleSubmit}>
              <FormHeader
                moduleCode="cs3216"
                moduleDescription="AY2019/2020, SEM1"
                moduleSemester="Software Engineering for Digital Markets"
              />
              <div className="ReviewPage__questions-container">
                <Metrics metrics={questions.metricTemplates} />
              </div>
              <div className="ReviewPage__questions-container">
                <Questions questions={questions.questionTemplates} />
              </div>
              <Button
                disabled={invalid || pristine}
                className="ReviewPage__button"
                type="submit"
                intent="primary"
              >
                Submit Review
              </Button>
            </form>
          </div>
        )}
      </FinalForm.Form>
    </RequiresAuth>
  );
};
