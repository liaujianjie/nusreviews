import * as React from "react";
import { Segment } from "semantic-ui-react";

interface FormSegmentProps {
  bgColor?: string;
  children: React.ReactNode;
}

const FormSegment: React.FunctionComponent<FormSegmentProps> = props => {
  return (
    <Segment
      basic
      padded
      style={{
        backgroundColor: props.bgColor,
        border: "2px solid white",
        margin: "0px"
      }}
    >
      {props.children}
    </Segment>
  );
};

export default FormSegment;
