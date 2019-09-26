import React from "react";
import _ from "lodash";

import { Button } from "@blueprintjs/core";

import { SplitColumns } from "../../../components/SplitColumns";
import { Section } from "../Section";
import { AttributeRating } from "./AttributeRating";
import { RatingModal } from "../RatingModal/index";

type OwnProps = {
  ratings: React.ComponentProps<typeof AttributeRating>[];
};

export const RatingSection: React.FunctionComponent<OwnProps> = ({
  ratings
}) => {
  return (
    <Section
      leftHeader={
        <Button rightIcon="caret-down" large text="AY 2019/2020, SEM 1" />
      }
      rightHeader={<RatingModal buttonName="Add Rating" moduleCode="CS3216" />}
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
