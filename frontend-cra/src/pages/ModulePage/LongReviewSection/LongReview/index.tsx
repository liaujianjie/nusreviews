import React from "react";

import { AnchorButton, Tag } from "@blueprintjs/core";

import "./style.css";
import { REVIEW_TYPE } from "../../../../constants/type";
import { GRADE } from '../../../../constants/grade';


type OwnProps = {
  semester: string;
  preview: string;
  programmeYear: string;
  major: string;
  expectedGrade: number;
  actualGrade: number;
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
            Expected <strong>{GRADE[expectedGrade]}</strong>
          </Tag>
          <Tag minimal>
            Actual <strong>{GRADE[actualGrade]}</strong>
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
        <AnchorButton
          className="LongReview__footer-more"
          rightIcon="arrow-right"
          minimal
          target='_blank'
          href='/review/10'
          text="Read More"
        />
      </div>
    </div>
  );
};
