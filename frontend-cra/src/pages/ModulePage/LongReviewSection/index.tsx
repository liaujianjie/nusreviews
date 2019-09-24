import React from "react";
import _ from "lodash";

import { Button, Divider } from "@blueprintjs/core";

import { Center } from "../../../components/Center";
import { Section } from "../Section";
import { LongReview } from "./LongReview";

import "./style.css";

type OwnProps = {};

export const LongReviewSection: React.FunctionComponent<OwnProps> = ({}) => {
  return (
    <Section
      leftHeader={
        <h2 className="LongReviewSection__left-header">Detailed reviews</h2>
      }
      body={
        <div>
          <div className="LongReviewSection__reviews-container">
            <LongReview
              author="Computer Science, Y4, AY17/18"
              actualGrade="A+"
              expectedGrade="A"
              message="How was the lecturer, Ben Leong? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explaining the answers for the tutorials. If you want a tutor who goes through the answers step by step, I suggest you attend Dr. Chong’s classes. How’s the tutors? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explai.."
              semester="AY2019/2020, SEM 1"
            />
            <LongReview
              author="Computer Science, Y4, AY17/18"
              actualGrade="A+"
              expectedGrade="A"
              message="How was the lecturer, Ben Leong? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explaining the answers for the tutorials. If you want a tutor who goes through the answers step by step, I suggest you attend Dr. Chong’s classes. How’s the tutors? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explai.."
              semester="AY2019/2020, SEM 1"
            />
            <LongReview
              author="Computer Science, Y4, AY17/18"
              actualGrade="A+"
              expectedGrade="A"
              message="How was the lecturer, Ben Leong? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explaining the answers for the tutorials. If you want a tutor who goes through the answers step by step, I suggest you attend Dr. Chong’s classes. How’s the tutors? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explai.."
              semester="AY2019/2020, SEM 1"
            />
          </div>
          <Divider className="LongReviewSection__divider" />
          <Center>
            <Button minimal text="Load more" />
          </Center>
        </div>
      }
    />
  );
};
