import * as React from "react";
import RadioButtonGroup from "../../../components/RadioButtonGroup/index";

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
  return (
    <div className="RatingForm__questions-container">
      metrics.map(metric => <RadioButtonGroup {...metric} />
      );
    </div>
  );
};

export default Metrics;
