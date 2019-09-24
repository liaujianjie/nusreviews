import React from "react";
import { Card } from "@blueprintjs/core";

import "./style.css";

type OwnProps = {
  leftHeader?: React.ReactNode;
  rightHeader?: React.ReactNode;
  body?: React.ReactNode;
};

export const Section: React.FunctionComponent<OwnProps> = ({
  leftHeader,
  rightHeader,
  body
}) => {
  return (
    <Card>
      <div className="Section__header-container">
        <div className="Section__left-header-container">{leftHeader}</div>
        <div className="Section__right-header-container">{rightHeader}</div>
      </div>
      <div className="Section__body-container">{body}</div>
    </Card>
  );
};
