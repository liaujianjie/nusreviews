import React from "react";
import _ from "lodash";
import { OPINIONS_TYPE, TIPS_TYPE } from "../../../constants/type";

import { Button, Divider } from "@blueprintjs/core";

import { SplitColumns } from "../../../components/SplitColumns";
import { Center } from "../../../components/Center";
import { Section } from "../Section";
import { DiscussionColumn } from "./DiscussionColumn";
import { DiscussionRow } from "./DiscussionRow";

import "./style.css";

type OwnProps = {
  opinions: OPINIONS_TYPE;
  tips: TIPS_TYPE;
};

export const DiscussionSection: React.FunctionComponent<OwnProps> = ({
  opinions,
  tips
}) => {
  return (
    <Section
      leftHeader={
        <h4 className="DiscussionSection__left-header">Student discussion</h4>
      }
      body={
        <SplitColumns>
          <DiscussionColumn>
            <Section
              leftHeader={<h3>What were the best parts?</h3>}
              body={opinions.map(entry => (
                <DiscussionRow
                  message={entry.description}
                  author="Computer Science, Y4, AY17/18"
                  vote={entry.opinionVotes.length}
                />
              ))}
              action={
                <div className="DiscussionSection__card-footer">
                  <Button minimal icon="chevron-down" text="More opinions" />
                  <Button icon="plus" intent="primary" text="Add opinion" />
                </div>
              }
            />
          </DiscussionColumn>
          <DiscussionColumn>
            <Section
              leftHeader={<h3>Any tips and tricks?</h3>}
              body={tips.map(entry => (
                <DiscussionRow
                  message={entry.description}
                  author="Computer Science, Y4, AY17/18"
                  vote={entry.tipVotes.length}
                />
              ))}
              action={
                <div className="DiscussionSection__card-footer">
                  <Button minimal icon="chevron-down" text="More tips" />
                  <Button icon="plus" intent="primary" text="Add tip" />
                </div>
              }
            />
          </DiscussionColumn>
        </SplitColumns>
      }
    />
  );
};
