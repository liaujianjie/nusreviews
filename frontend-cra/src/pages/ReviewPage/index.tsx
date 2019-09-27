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
  postQuestions,
  getQuestions,
  Metric,
  Question
} from "../../api/review";

import "./style.css";

export const ReviewPage: React.FunctionComponent = () => {
  const [questions, setQuestions] = React.useState({
    metricTemplates: reviewTemplate.metricTemplates,
    questionTemplates: reviewTemplate.questionTemplates
  });

  const [answers, setAnswers] = React.useState({
    metricTemplates: [],
    questionTemplates: []
  });

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const payload = await getQuestions();

      setQuestions({ ...payload });
    };
    fetchQuestions();
  }, []);

  const updateValues = (values: any) => {
    for (let [key, value] of Object.entries(values)) {
      const { metricTemplates, questionTemplates } = questions;
      // key is question name
      const metricHit = metricTemplates.forEach(metric => {
        console.log(metric)
        // if (metric.name === key) metric.value = value;
      });
      const questionHit = questionTemplates.filter(qn => qn.question === key);
      // if (metricHit !== []) {
        // const metric = metricHit[0] as Metric;
        // console.log(metric);
        // metric.value = value as number;
        // const metricCopy = [...answers.metricTemplates, metric];
        // setAnswers({ ...answers, metricTemplates: metricCopy });
      // } else {
        const question = questionHit[0] as Question;
        question.answer = value as string;
        const questionCopy = { ...answers.questionTemplates, question };
        setAnswers({ ...answers, questionTemplates: questionCopy });
      // }
    }
  };

  const onSubmit = (values: any) => {
    const { expectedGrade, actualGrade } = values;
    updateValues(values);
    const payload = { expectedGrade, actualGrade };
    // console.log(values);
    postQuestions(1, payload);
  };

  return (
    <RequiresAuth>
      <FinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <>
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
              onClick={(e: React.MouseEvent<HTMLElement>) => handleSubmit()}
            >
              Submit Review
            </Button>
          </>
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
