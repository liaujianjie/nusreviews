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
            on="focus"
            open={meta.dirty && meta.error}
            trigger={
              <WordCountWrap wordLimit={wordLimit} text={input.value}>
                <Form.TextArea
                  control={TextareaAutosize}
                  label={question}
                  placeholder={placeholder}
                  {...input}
                  style={{ width: "100%", minHeight: "6em" }}
                />
              </WordCountWrap>
            }
            error={meta.dirty && meta.error}
            content={meta.error}
            position="right center"
          />
        );
      }}
    </FinalForm.Field>
  );
};

export default LongTextInput;
