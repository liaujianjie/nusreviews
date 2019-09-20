import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Form } from "semantic-ui-react";

import { Field } from "react-final-form";

export interface LongTextInputProps {
  name: string;
  value?: string | number;
  label?: string;
  question: string;
  children?: React.ReactNode;
  placeholder: string;
  rows?: number;
}

const LongTextInput: React.FunctionComponent<LongTextInputProps> = props => {
  return (
    <Field {...props} component="textarea">
      {fieldProps => {
        return (
          <Form.TextArea
            control={TextareaAutosize}
            label={props.question}
            placeholder={props.placeholder}
            onChange={fieldProps.input.onChange}
            value={props.value || ""}
          />
        );
      }}
    </Field>
  );
};

export default LongTextInput;
