import React from "react";
import { RequiresAuth } from "../../components/RequiresAuth";

import { DetailSection } from "./DetailSection";
import { RatingSection } from "./RatingSection";
import { DiscussionSection } from "./DiscussionSection";
import { LongReviewSection } from "./LongReviewSection";

import "./style.css";

const RATINGS = [
  { name: "Lecturer", score: 4.5 },
  { name: "Lecturer", score: 4.5 },
  { name: "Lecturer", score: 4.5 },
  { name: "Lecturer", score: 4.5 },
  { name: "Lecturer", score: 4.5 }
];

export const ModulePage: React.FunctionComponent = () => {
  return (
    // <RequiresAuth>
    <div className="ModulePage__container">
      <DetailSection />
      <RatingSection ratings={RATINGS} />
      <DiscussionSection />
      <LongReviewSection />
    </div>
    // </RequiresAuth>
  );
};
