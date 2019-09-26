import * as React from "react";

import * as FinalForm from "react-final-form";
import * as _ from "lodash";
import TextArea from "react-textarea-autosize";

import "./style.css";
// import { TextArea } from "@blueprintjs/core";

interface TextAreaProps {
  placeholder: string;
  question: string;
  compulsory: boolean;
}

export const FinalTextAreaGroup: React.FunctionComponent<
  FinalForm.FieldRenderProps<string, HTMLElement>
> = props => {
  return (
    <TextArea
      {...props}
      {...props.input}
      minRows={4}
      className="TextAreaInput"
    />
  );
};

export const TextAreaInput: React.FunctionComponent<TextAreaProps> = props => {
  const { placeholder, question, compulsory } = props;

  return (
    <div className="TextAreaInput__container">
      <span>{question}</span>
      <FinalForm.Field
        type="textarea"
        component={FinalTextAreaGroup}
        name={question}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextAreaInput;
