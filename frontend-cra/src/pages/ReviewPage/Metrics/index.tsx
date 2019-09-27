import * as React from "react";

import { RadioButtonGroup } from "../../../components/RadioButtonGroup/index";
import { FormSegment } from "../FormSegment/index";
import { Metric } from "../../../api/review";

interface MetricsProps {
  metrics: Array<Metric>;
}

export const Metrics: React.FunctionComponent<MetricsProps> = props => {
  const { metrics } = props;
  const getMetric = metrics.map(metric => (
    <RadioButtonGroup {...metric} mobile={false} />
  ));
  return (
    <FormSegment bgColor="grey">
      <div className="RatingForm__questions-container">{getMetric} </div>
    </FormSegment>
  );
};
