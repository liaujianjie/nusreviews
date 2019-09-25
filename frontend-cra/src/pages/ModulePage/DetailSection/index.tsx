import React from "react";

import { Section } from "../Section";

import "./style.css";

type OwnProps = {
  moduleCode: string;
  title: string;
  description: string;
};

export const DetailSection: React.FunctionComponent<OwnProps> = ({
  moduleCode,
  title,
  description
}) => {
  return (
    <Section
      leftHeader={
        <div className="DetailSection__header-container">
          <h1>{moduleCode}</h1>
          <h3>{title}</h3>
        </div>
      }
      body={<p>{description}</p>}
    />
  );
};
