import * as React from "react";
import { Radio, RadioGroup } from "@blueprintjs/core";

import { Field } from "react-final-form";

import * as _ from "lodash";

interface RadioGroupProps {
  name: string;
  minValue: number;
  maxValue: number;
  minDescription: string;
  maxDescription: string;
  compulsory: boolean;
}

export const RadioButtonGroup: React.FunctionComponent<
  RadioGroupProps
> = props => {
  const { minValue, maxValue, minDescription, maxDescription } = props;

  const { name, handleMetricChange, selectedMetric } = props;

  const getRadioButtons = () => {
    return _.range(minValue, maxValue + 1).map(value => {
      const label =
        value === minValue
          ? minDescription
          : value === maxValue
          ? maxDescription
          : undefined;
      <Radio value={value} label={label} />;
    });
  };

  return (
    <RadioGroup
      onChange={handleMetricChange}
      selectedValue={selectedMetric}
      label={name}
    >
      {getRadioButtons()}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
