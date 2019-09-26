import React from "react";
import { Button, Tag } from "@blueprintjs/core";

import "./style.css";
import { REVIEW_TYPE } from "../../../../constants/type";

type OwnProps = {
  semester: string;
  preview: string;
  programmeYear: string;
  major: string;
  expectedGrade: string;
  actualGrade: string;
};

export const LongReview: React.FunctionComponent<REVIEW_TYPE> = ({
  semester,
  preview,
  programmeYear,
  major,
  expectedGrade,
  actualGrade
}) => {
  return (
    <div className="LongReview">
      <div className="LongReview__header-container">
        <span className="LongReview__grades-container">
          <Tag minimal>
            Expected <strong>{expectedGrade}</strong>
          </Tag>
          <Tag minimal>
            Actual <strong>{actualGrade}</strong>
          </Tag>
        </span>
        <Tag minimal>{semester}</Tag>
      </div>
      <p>{preview}</p>
      <div className="LongReview__footer-container">
        <div className="LongReview__footer-author bp3-text-disabled">{`${
          major ? major : "Hidden Major"
        }, ${
          programmeYear ? "Y" + programmeYear : "Hidden Programme Year"
        }`}</div>
        <Button
          className="LongReview__footer-more"
          rightIcon="arrow-right"
          minimal
          text="Read More"
        />
      </div>
    </div>
  );
};
