import React from "react";
import { InputGroup, Button } from "@blueprintjs/core";

import { RequiresAuth } from "../../components/RequiresAuth";
import { Center } from "../../components/Center";

import "./style.css";
import FormSegment from "./FormSegment";
import FormHeader from "./FormHeader/index";
import * as FinalForm from "react-final-form";

export const ReviewPage: React.FunctionComponent = () => {
  const onSubmit = (values: any) => {
    window.alert("Form submitted!" + JSON.stringify(values));
  };

  return (
    // <RequiresAuth>
    <Center>
      <FinalForm.Form onSubmit={onSubmit}>
        {({ handleSubmit, invalid, pristine }) => (
          <>
            <FormHeader
              moduleCode="cs3216"
              moduleDescription="AY2019/2020, SEM1"
              moduleSemester="Software Engineering for Digital Markets"
            />
            <Button onClick={(e: any) => handleSubmit()}>Submit Review</Button>
          </>
        )}
      </FinalForm.Form>
    </Center>
    // </RequiresAuth>
  );
};

export default ReviewPage;

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
