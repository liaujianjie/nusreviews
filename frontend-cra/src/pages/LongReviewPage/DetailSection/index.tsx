import React from "react";

import { RatingSection } from "../RatingSection";
import { AttributeRating } from '../RatingSection/AttributeRating';
import { Section } from "../Section";

import "./style.css";
import { Tag } from "@blueprintjs/core";

type OwnProps = {
  moduleCode: string;
  title: string;
  semester: string;
  programmeYear: string;
  major: string;
  ratings: React.ComponentProps<typeof AttributeRating>[];
};

export const DetailSection: React.FunctionComponent<OwnProps> = ({
  moduleCode,
  title,
  semester,
  major,
  programmeYear,
  ratings,
}) => {
  return (
    <Section
      leftHeader={
        <div className="DetailSection__header-container">
          <h1>{moduleCode}</h1>
          <h3>{title}</h3>
        </div>
      }
      rightHeader={
        <div>
          <Tag minimal>{semester}</Tag><br/><br/>
          <p>{`${
              major ? major : "Hidden Major"
            }, ${
              programmeYear ? "Y" + programmeYear : "Hidden Programme Year"
            }`}</p>
        </div>
      }
      body={
        <div>
          <RatingSection ratings={ratings} />
        </div>
      }
    />
  );
};
