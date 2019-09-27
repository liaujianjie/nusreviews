import React from "react";
import _ from "lodash";

import { Button, Divider } from "@blueprintjs/core";

import { Center } from "../../../components/Center";
import { Section } from "../Section";
import { LongReview, LongReviewOwnProps } from "./LongReview";

import "./style.css";

type OwnProps = {
  questions: React.ComponentProps<typeof LongReview>[];
};

export const LongReviewSection: React.FunctionComponent<OwnProps> = ({
  questions
}) => {
  return (
    <Section
      leftHeader={
        <h4 className="LongReviewSection__left-header">Detailed Review</h4>
      }
      body={
        <div>
          <div className="LongReviewSection__reviews-container">
            {questions.map((entry: LongReviewOwnProps) => (
              <LongReview
                question={entry.question}
                answer={entry.answer}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};
