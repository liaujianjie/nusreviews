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
          <DiscussionColumn title="What were the best parts?">
            {opinions.map(entry => (
              <DiscussionRow
                message={entry.description}
                author="Computer Science, Y4, AY17/18"
                vote={entry.opinionVotes.length}
              />
            ))}
            <Button icon="plus" intent="primary" text="Add opinion" />
          </DiscussionColumn>
          <DiscussionColumn title="Any tips and tricks?">
            {tips.map(entry => (
              <DiscussionRow
                message={entry.description}
                author="Computer Science, Y4, AY17/18"
                vote={entry.tipVotes.length}
              />
            ))}
            <Button icon="plus" intent="primary" text="Add tip" />
          </DiscussionColumn>
        </SplitColumns>
      }
      action={
        <Center>
          <Button icon="chevron-down" minimal text="More discussions" />
        </Center>
      }
    />
  );
};
