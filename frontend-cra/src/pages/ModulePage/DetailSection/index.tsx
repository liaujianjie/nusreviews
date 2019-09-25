import React from "react";

import { Section } from "../Section";

import "./style.css";

export const DetailSection = () => {
  return (
    <Section
      leftHeader={
        <div className="DetailSection__header-container">
          <h1>CS3216</h1>
          <h3>Software Product Engineering for Digital Markets</h3>
        </div>
      }
      body={
        <p>
          In this module, students will practice software product engineering by
          working in small teams to develop well-tested, user-friendly,
          production-quality software for the real world. To support this goal,
          students work closely with users to understand their problems, gather
          their requirements, and obtain their feedback through a rapid,
          iterative, application design and development process. Students will
          also be exposed to practical issues for digital markets such as
          growing the user base of their application, deployment of the
          application on the Web or in the cloud system, and validating the UI
          design and UX of the application.
        </p>
      }
    />
  );
};
