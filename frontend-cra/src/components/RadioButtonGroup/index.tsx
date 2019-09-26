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
  // const ref = React.useRef<HTMLDivElement | null>(null);
  // const [dimensions, setDimensions] = React.useState({});
  // React.useLayoutEffect(() => {
  //   setDimensions(ref.current ? ref.current.getClientBoundingRect() : {});
  // }, [ref.current]);

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
      return (
        <div className="RadioButtonGroup__radio-button">
          <FinalForm.Field
            name={name}
            component={FinalRadioButtonInput}
            type="radio"
            value={`${value}`}
          />
          {value === minValue && label}
          {value === maxValue && label}
        </div>
      );
    });
  };
  return (
    <>
      <div className="RadioButtonGroup__container-mobile">
        <div className="RadioButtonGroup__left-segment-mobile">{name}</div>
        <div className="RadioButtonGroup__right-segment-mobile">
          {getRadioButtons()}
        </div>
      </div>
      {/* <div className="RadioButtonGroup__container-desktop">
        <div className="RadioButtonGroup__left-segment-desktop">{name}</div>
        <div className="RadioButtonGroup__right-segment-desktop">
          <label>{minDescription}</label>
          {getRadioButtons()}
          <label>{maxDescription}</label>
        </div>
      </div> */}
    </>
  );
};

export default RadioButtonGroup;
