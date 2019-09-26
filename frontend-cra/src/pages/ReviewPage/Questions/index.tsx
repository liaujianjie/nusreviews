import * as React from "react";
import * as _ from "lodash";
import TextAreaInput from "../../../components/TextAreaInput";
import FormSegment from "../FormSegment";

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
  const questionSegment = _.chunk(questions, 3);
  return (
    <div>
      {questionSegment.map((segment, index) => (
        <FormSegment bgColor={index % 2 === 0 ? "white" : "grey"}>
          {segment.map(question => (
            <TextAreaInput {...question} />
          ))}
        </FormSegment>
      ))}
    </div>
  );
};

export default Questions;
