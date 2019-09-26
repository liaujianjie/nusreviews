import React from "react";
import _ from "lodash";

import { Button, Divider } from "@blueprintjs/core";

import { SplitColumns } from "../../../components/SplitColumns";
import { Center } from "../../../components/Center";
import { Section } from "../Section";
import { DiscussionColumn } from "./DiscussionColumn";
import { DiscussionRow } from "./DiscussionRow";
import { ShortReviewModal } from "../ShortReviewModal";

import "./style.css";

type OwnProps = {};

export const DiscussionSection: React.FunctionComponent<OwnProps> = ({}) => {
  return (
    <Section
      leftHeader={
        <h2 className="DiscussionSection__left-header">Student discussion</h2>
      }
      body={
        <div>
          <SplitColumns>
            <DiscussionColumn title="What were the best parts?">
              <DiscussionRow
                message="I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
                author="Computer Science, Y4, AY17/18"
              />
              <DiscussionRow
                message="I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
                author="Computer Science, Y4, AY17/18"
              />
              <DiscussionRow
                message="I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
                author="Computer Science, Y4, AY17/18"
              />
              <ShortReviewModal
                buttonName="Add tip"
                name="Tip 1"
                question="What tip do you want to give"
                placeholder="any tip"
              />
              {/* <Button icon="plus" intent="primary" text="Add tip" /> */}
            </DiscussionColumn>
            <DiscussionColumn title="Any tips and tricks?">
              <DiscussionRow
                message="I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
                author="Computer Science, Y4, AY17/18"
              />
              <DiscussionRow
                message="I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
                author="Computer Science, Y4, AY17/18"
              />
              <DiscussionRow
                message="I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
                author="Computer Science, Y4, AY17/18"
              />
              <ShortReviewModal
                buttonName="Add Opinion"
                name="Opinion 1"
                question="What opinion do you want to give"
                placeholder="any opinion"
              />
            </DiscussionColumn>
          </SplitColumns>
          <Divider className="DiscussionSection__divider" />
          <Center>
            <Button minimal text="Load more" />
          </Center>
        </div>
      }
    />
  );
};
