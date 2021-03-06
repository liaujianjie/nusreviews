import React from "react";
import _ from "lodash";
import { OPINIONS_TYPE, TIPS_TYPE } from "../../../constants/type";

import { Button, Divider } from "@blueprintjs/core";

import { SplitColumns } from "../../../components/SplitColumns";
import { Center } from "../../../components/Center";
import { Section } from "../Section";
import { DiscussionColumn } from "./DiscussionColumn";
import { DiscussionRow } from "./DiscussionRow";
import { ShortReviewModal } from "../ShortReviewModal";

import "./style.css";

type OwnProps = {
  opinions: OPINIONS_TYPE;
  tips: TIPS_TYPE;
  msId: number;
};

export class DiscussionSection extends React.Component<OwnProps> {
  state = {
    moreOpinions: true,
    moreTips: true,
  };

  render() {
    const { opinions, tips, msId } = this.props;
    const numberOfRenderedOpinions = this.state.moreOpinions
      ? 5
      : opinions.length;
    const numberOfRenderedTips = this.state.moreTips ? 5 : tips.length;
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
                body={opinions.slice(0, numberOfRenderedOpinions).map(entry => (
                  <DiscussionRow
                    message={entry.description}
                    author={`${entry.major ? entry.major : "Hidden Major"}, ${
                      entry.programmeYear
                        ? "Y" + entry.programmeYear
                        : "Hidden Programme Year"
                    }`}
                    vote={entry.opinionVotes.length}
                  />
                ))}
                action={
                  <div className="DiscussionSection__card-footer">
                    {opinions.length >= 5 && (
                      <Button
                        disabled={opinions.length < 5}
                        minimal
                        onClick={() =>
                          this.setState({
                            moreOpinions: !this.state.moreOpinions
                          })
                        }
                        icon={
                          this.state.moreOpinions
                            ? "chevron-down"
                            : "chevron-up"
                        }
                        text={
                          this.state.moreOpinions
                            ? "More opinions"
                            : "Show less"
                        }
                      />
                    )}
                    <ShortReviewModal
                      type="opinion"
                      buttonName="Add Opinion"
                      name="Opinion 1"
                      question="What opinion do you want to give?"
                      placeholder="Feel free to share any opinion"
                      msId={msId}
                    />
                  </div>
                }
              />
            </DiscussionColumn>
            <DiscussionColumn>
              <Section
                leftHeader={<h3>Any tips and tricks?</h3>}
                body={tips.slice(0, numberOfRenderedTips).map(entry => (
                  <DiscussionRow
                    message={entry.description}
                    author={`${entry.major ? entry.major : "Hidden Major"}, ${
                      entry.programmeYear
                        ? "Y" + entry.programmeYear
                        : "Hidden Programme Year"
                    }`}
                    vote={entry.tipVotes.length}
                  />
                ))}
                action={
                  <div className="DiscussionSection__card-footer">
                    <Button
                      minimal
                      disabled={tips.length <= 5}
                      onClick={() =>
                        this.setState({ moreTips: !this.state.moreTips })
                      }
                      icon={this.state.moreTips ? "chevron-down" : "chevron-up"}
                      text={this.state.moreTips ? "More tips" : "Show less"}
                    />
                    <ShortReviewModal
                      type="tip"
                      buttonName="Add tip"
                      name="Tip 1"
                      question="What tips do you want to share?"
                      placeholder="Feel free to share any tip"
                      msId={msId}
                    />
                  </div>
                }
              />
            </DiscussionColumn>
          </SplitColumns>
        }
      />
    );
  }
}
