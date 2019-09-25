import * as React from "react";
import RadioButtonGroup from "../../../components/RadioButtonGroup/index";
import * as FinalForm from "react-final-form";

interface MetricsProps {
  metrics: Array<Metric>;
}

interface Metric {
  name: string;
  minValue: number;
  maxValue: number;
  minDescription: string;
  maxDescription: string;
  compulsory: boolean;
}

export const Metrics: React.FunctionComponent<MetricsProps> = props => {
  const { metrics } = props;
  const getMetric = metrics.map(metric => <RadioButtonGroup {...metric} />);
  return <div className="RatingForm__questions-container">{getMetric} </div>;
};

export default Metrics;
