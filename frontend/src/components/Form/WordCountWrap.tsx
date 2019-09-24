import * as React from "react";
import { Label, Segment } from "semantic-ui-react";

interface WordCountWrapProps {
  wordLimit: number;
  children: React.ReactNode;
  text: string;
}

const WordCountWrap = (props: WordCountWrapProps) => {
  const { wordLimit, children, text } = props;
  if (!wordLimit) return children;
  const wordCount = text ? text.length : 0;
  return (
    <Segment basic style={{ padding: "0px", paddingBottom: "1.8em" }}>
      {children}
      <Label
        attached="bottom right"
        basic
        style={{ border: "0px", backgroundColor: "transparent" }}
      >
        {wordCount} / {wordLimit} characters
      </Label>
    </Segment>
  );
};

export default WordCountWrap;
