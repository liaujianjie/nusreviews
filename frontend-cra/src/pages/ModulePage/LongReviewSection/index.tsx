import React from "react";
import _ from "lodash";

import { AnchorButton, Divider } from "@blueprintjs/core";

import { Center } from "../../../components/Center";
import { Section } from "../Section";
import { LongReview } from "./LongReview";

import "./style.css";
import { REVIEWS_TYPE, REVIEW_TYPE } from "../../../constants/type";

type OwnProps = {
  reviews: React.ComponentProps<typeof LongReview>[];
  msId: number,
};

export const LongReviewSection: React.FunctionComponent<OwnProps> = ({
  reviews,
  msId
}) => {
  return (
    <Section
      leftHeader={
        <h4 className="LongReviewSection__left-header">Detailed reviews</h4>
      }
      rightHeader={
        <AnchorButton
          icon="plus"
          intent="primary"
          target='_blank'
          href={`/review/${msId}/new`}
          text="Add Review"
        />
      }
      body={
        <div>
          <div className="LongReviewSection__reviews-container">
            {reviews.map((entry: REVIEW_TYPE) => (
              <LongReview
                semester={entry.semester}
                preview={entry.preview}
                programmeYear={entry.programmeYear}
                major={entry.major}
                expectedGrade={entry.expectedGrade}
                actualGrade={entry.actualGrade}
                questions={entry.questions}
                id={entry.id}
              />
            ))}
          </div>
        </div>
      }
    />
  );
};
