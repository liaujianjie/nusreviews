import * as React from "react";
import * as _ from "lodash";
import * as FinalForm from "react-final-form";

import { Radio } from "@blueprintjs/core";

import "./style.css";
import { Metric } from "../../api/review";

interface RadioGroupProps extends Metric {
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
      return (
        <div className="RadioButtonGroup__radio-button">
          <FinalForm.Field
            name={name}
            component={FinalRadioButtonInput}
            type="radio"
            value={`${value}`}
          />
          {value === minValue && mobile && minDescription}
          {value === maxValue && mobile && maxDescription}
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
