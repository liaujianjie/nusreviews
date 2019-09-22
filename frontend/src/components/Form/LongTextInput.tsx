import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Form, Popup } from "semantic-ui-react";

import * as FinalForm from "react-final-form";
import WordCountWrap from "./WordCountWrap";

export interface LongTextInputProps {
  value?: string | number;
  label?: string;
  children?: React.ReactNode;
  rows?: number;
  wordLimit?: number;
  question?: string;
  name: string;
  placeholder: string;
}

const LongTextInput: React.FunctionComponent<LongTextInputProps> = props => {
  const { wordLimit, placeholder, question } = props;
  return (
    <FinalForm.Field {...props}>
      {({ input, meta }) => {
        return (
          <Popup
            inverted
            position="top left"
            // can't seem to get it to popup when the modal reopens because there's no change in the open props
            open={meta.error}
            trigger={
              <WordCountWrap wordLimit={wordLimit} text={input.value}>
                <Form.TextArea
                  control={TextareaAutosize}
                  label={question}
                  placeholder={placeholder}
                  {...input}
                  // couldn't find a way to get the textarea to occupy entire width on ShortReview form
                  style={{ width: "100%", minHeight: "6em" }}
                />
              </WordCountWrap>
            }
            error={meta.error}
            content={meta.error}
          />
        );
      }}
    </FinalForm.Field>
  );
};

export default LongTextInput;
