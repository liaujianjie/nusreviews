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
    metricTemplates: reviewTemplate.metricTemplates,
    questionTemplates: reviewTemplate.questionTemplates
  });

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const payload = await getQuestions();

      setQuestions({ ...payload });
    };
    fetchQuestions();
  }, []);

  for (let [key, value] of Object.entries(values)) {
    const metricTemplate = metrics.find(m => m.name === key) as any;
    payload.push({ metricTemplate: metricTemplate.id, value });
  }

  const updateValues = (values: any) => {
    for (let [key, value] of Object.entries(values)) {
      const { metricTemplates, questionTemplates } = questions;
      const metric = metricTemplates.find(m => m.name === key) as any;
      const question = questionTemplates.find(qn => qn.question === key) as any;

      // metricTemplates.forEach((metric: Metric) => {
      //   if (metric.name === key) metric.value = value as number;
      // });
      // questionTemplates.forEach((question: Question) => {
      //   if (question.question === key) question.answer = value as string;
      // });
      setQuestions({ metricTemplates, questionTemplates });
    }
  };

  const parsePayload = (payload: any) => {
    const {
      expectedGrade,
      actualGrade,
      metricTemplates,
      questionTemplates
    } = payload;
    const metrics = metricTemplates.map((m: any) => ({
      metricTemplate: m.id,
      value: parseInt(m.value)
    }));
    const questions = questionTemplates.map((q: any) => ({
      questionTemplate: q.id,
      answer: q.answer
    }));
    return {
      expectedGrade: GRADES_TO_INT(expectedGrade),
      actualGrade: GRADES_TO_INT(actualGrade),
      metrics,
      questions
    };
  };

  const onSubmit = (values: any) => {
    const { expectedGrade, actualGrade, ...otherValues } = values;
    updateValues(otherValues);
    const payload = parsePayload({ ...questions, expectedGrade, actualGrade });
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
            <Button type="submit">Submit Review</Button>
          </form>
        )}
      </FinalForm.Form>
    </RequiresAuth>
  );
};

export const LECTURER_QUESTIONS = [
  {
    scale: 5,
    name: "lecturerGeneral",
    question: "How was your lecturer, Ben Leong?",
    value: ["Below Expectations", "Amazing"]
  },
  {
    scale: 5,
    name: "lecturerKnowledge",
    question: "Level of knowledge?",
    value: ["Poor", "Good"]
  },
  {
    scale: 5,
    name: "lecturerStyle",
    question: "Engaging teaching style?",
    value: ["Boring", "Engaging"]
  },
  {
    scale: 5,
    name: "lecturerEnergy",
    question: "Energy during the module?",
    value: ["Dull", "Passionate"]
  }
];

export const WORKLOAD_QUESTIONS = [
  {
    scale: 5,
    name: "workloadGeneral",
    question: "How was the workload (project, assignments)?",
    value: ["Chill", "Shag"]
  },
  {
    scale: 5,
    name: "workloadInteresting",
    question: "Was it interesting?",
    value: ["Boring", "Interesting"]
  },
  {
    scale: 5,
    name: "workloadRecommend",
    question: "Would you recommend this to me?",
    value: ["Avoid", "Recommend"]
  }
];

export const SHORT_REVIEW_TIPS = {
  name: "shortReviewTip",
  placeholder:
    "Are the lecturers worth going for/how much time should I take to prepare for tutorials...",
  question: "What are some tips for doing well in this module?"
};

export const SHORT_REVIEW_OPINION = {
  name: "shortReviewOpinion",
  placeholder:
    "Tell me more maybe about the teaching style, energy during the module, attitude towards attendance...",
  question: "What were the best parts of the module?"
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
