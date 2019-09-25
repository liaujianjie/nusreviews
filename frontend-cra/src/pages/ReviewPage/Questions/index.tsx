import * as React from "react";

interface QuestionsProps {
  questions: Array<Question>;
}

interface Question {
  compulsory: boolean;
  question: string;
  placeholder: string;
}

export const Questions: React.FunctionComponent<QuestionsProps> = props => {
  return <div></div>;
};

export default Questions;
