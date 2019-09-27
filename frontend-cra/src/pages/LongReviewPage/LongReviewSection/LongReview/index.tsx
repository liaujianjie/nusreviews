import React from "react";

import { AnchorButton, Tag } from "@blueprintjs/core";

import "./style.css";
import { GRADE } from '../../../../constants/grade';


export type LongReviewOwnProps = {
  answer: string,
  question: string,
};

export const LongReview: React.FunctionComponent<LongReviewOwnProps> = ({
  answer,
  question,
}) => {
  return (
    <div className="LongReview">
      <div className="LongReview__header-container">
        <h4>{question}</h4>
      </div>
      <div className="LongReview__answer-container">
        <p>{answer}</p>
      </div>
    </div>
  );
};
