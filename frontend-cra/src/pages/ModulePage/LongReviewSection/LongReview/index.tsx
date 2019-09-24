import React from "react";
import { Tag } from "@blueprintjs/core";

import "./style.css";

type OwnProps = {
  author: string;
  expectedGrade: string;
  actualGrade: string;
  message: string;
  semester: string;
};

export const LongReview: React.FunctionComponent<OwnProps> = ({
  author,
  expectedGrade,
  actualGrade,
  message,
  semester
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
      <p>
        {message} <a href="#">Read more</a>
      </p>
      <div className="LongReview__footer-container">
        <div className="bp3-text-disabled">{author}</div>
        {/* <Tag minimal>something else here...</Tag> */}
      </div>
    </div>
  );
};
