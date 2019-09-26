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
  mobile: boolean;
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

  const getRadioButtons = (mobile: boolean) => {
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
      return (
        <div className="RadioButtonGroup__radio-button">
          <FinalForm.Field
            name={name}
            component={FinalRadioButtonInput}
            type="radio"
            value={`${value}`}
          />
          {value === minValue && mobile && label}
          {value === maxValue && mobile && label}
        </div>
      );
    });
  };
  if (props.mobile) {
    return (
      <div className="RadioButtonGroup__container-mobile">
        <div className="RadioButtonGroup__left-segment-mobile">{name}</div>
        <div className="RadioButtonGroup__right-segment-mobile">
          {getRadioButtons(true)}
        </div>
      </div>
    );
  } else {
    return (
      <div className="RadioButtonGroup__container-desktop">
        <div className="RadioButtonGroup__left-segment-desktop">{name}</div>
        <div className="RadioButtonGroup__right-segment-desktop">
          <label>{minDescription}</label>
          {getRadioButtons(props.mobile)}
          <label>{maxDescription}</label>
        </div>
      </div>
    );
  }
};

export default RadioButtonGroup;
