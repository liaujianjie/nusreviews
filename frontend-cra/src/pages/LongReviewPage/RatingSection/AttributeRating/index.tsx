import React from "react";

import { ProgressBar } from "@blueprintjs/core";

import "./style.css";

type OwnProps = {
  value: number,
  name: string,
  minValue: number,
  minDescription: string,
  maxValue: number,
  maxDescription: string,
}

export const AttributeRating: React.FunctionComponent<OwnProps> = ({
  value,
  name,
  minValue,
  minDescription,
  maxValue,
  maxDescription
}) => {
  return (
    <div className="AttributeRating">
      <div className="AttributeRating__label">
        <h4>{name}</h4>
        <p className="AttributeRating__value">
          {value} / {maxValue}
        </p>
      </div>
      <ProgressBar intent="primary" stripes={false} value={value / maxValue} />
      <div className="AttributeRating__description">
        <p>{minDescription}</p>
        <p>{maxDescription}</p>
      </div>
    </div>
  );
};
