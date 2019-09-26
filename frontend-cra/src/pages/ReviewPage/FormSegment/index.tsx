import * as React from "react";
import "./style.css";
import { Center } from "../../../components/Center";

interface FormSegmentProps {
  bgColor?: string;
  children: React.ReactNode;
}

export const FormSegment: React.FunctionComponent<FormSegmentProps> = props => {
  const { bgColor, children } = props;
  return <div className={`FormSegment__${bgColor}`}>{children}</div>;
};

export default FormSegment;
