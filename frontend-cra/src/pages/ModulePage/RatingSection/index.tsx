import React from "react";
import _ from "lodash";

import { Button } from "@blueprintjs/core";

import { SplitColumns } from "../../../components/SplitColumns";
import { Section } from "../Section";
import { AttributeRating } from "./AttributeRating";

import "./style.css";

type OwnProps = {
  ratings: React.ComponentProps<typeof AttributeRating>[];
};

export const RatingSection: React.FunctionComponent<OwnProps> = ({
  ratings
}) => {
  return (
    <Section
      leftHeader={<h4 className="RatingSection__left-header">Overall Ratings</h4>}
      rightHeader={<Button icon="plus" intent="primary" text="Add Rating" />}
      body={
        <SplitColumns>
          {_.map(ratings, rating => (
            <AttributeRating {...rating} />
          ))}
        </SplitColumns>
      }
    />
  );
};
