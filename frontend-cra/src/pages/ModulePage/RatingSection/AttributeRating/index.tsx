import React from "react";

import { ProgressBar, Tag, Intent } from "@blueprintjs/core";

import "./style.css";

type OwnProps = {
  name: string;
  score: number;
};

export const AttributeRating: React.FunctionComponent<OwnProps> = ({
  name,
  score
}) => {
  // let intent: Intent = "danger";

  // if (score > 1.5) {
  //   intent = "warning";
  // }
  // if (score > 2.5) {
  //   intent = "success";
  // }

  return (
    <div className="AttributeRating">
      <span className="AttributeRating__label">
        {name}{" "}
        <Tag minimal>
          <strong>{Math.round(score * 10) / 10}</strong> / 5.0
        </Tag>
      </span>
      <ProgressBar intent="primary" stripes={false} value={score / 5} />
    </div>
  );
};
