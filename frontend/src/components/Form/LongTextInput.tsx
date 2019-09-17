import * as React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Form, TextAreaProps } from "semantic-ui-react";
import { LongTextInputProps } from "./Form";

import { Field } from "react-final-form";

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
