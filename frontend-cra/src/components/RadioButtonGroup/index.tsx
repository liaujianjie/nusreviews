import * as React from "react";

import * as FinalForm from "react-final-form";

import * as _ from "lodash";

import "./style.css";
import { Radio } from "@blueprintjs/core";

interface RadioGroupProps {
  name: string;
  minValue: number;
  maxValue: number;
  minDescription: string;
  maxDescription: string;
  compulsory: boolean;
}

export const FinalRadioButtonInput: React.FunctionComponent<
  FinalForm.FieldRenderProps<string, HTMLInputElement>
> = props => {
  return <Radio {...props} {...props.input} />;
};

export const RadioButtonGroup: React.FunctionComponent<
  RadioGroupProps
> = props => {
  const { minValue, maxValue, minDescription, maxDescription, name } = props;

  // const { name, handleMetricChange, selectedMetric } = props;

  const getRadioButtons = () => {
    return _.range(minValue, maxValue + 1).map(value => {
      const label = (
        <label>
          {value === minValue
            ? minDescription
            : value === maxValue
            ? maxDescription
            : undefined}
        </label>
      );
      // return <Radio value={value} label={label} name={name} />;
      return (
        <>
          {value === minValue && label}
          <FinalForm.Field
            name={name}
            component={FinalRadioButtonInput}
            type="radio"
            value={`${value}`}
          />
          {value === maxValue && label}
        </>
      );
    });
  };
  return (
    <div className="RadioButtonGroup__container">
      <div className="RadioButtonGroup__left-segment">{name}</div>
      <div className="RadioButtonGroup__right-segment">
        {getRadioButtons()}{" "}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
