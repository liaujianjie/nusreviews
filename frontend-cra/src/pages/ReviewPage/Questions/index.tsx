import * as React from "react";
import TextAreaInput from "../../../components/TextAreaInput";

interface QuestionsProps {
  questions: Array<Question>;
}
interface Question {
  compulsory: boolean;
  question: string;
  placeholder: string;
}

export const Questions: React.FunctionComponent<QuestionsProps> = props => {
  const { questions } = props;
  return (
    <div>
      {questions.map(question => (
        <TextAreaInput {...question} />
      ))}
    </div>
  );
};

export default Questions;
