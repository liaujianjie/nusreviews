import React from "react";

import "./style.css";

import { Button } from "@blueprintjs/core";

type OwnProps = {
  message: string;
  author: string;
  vote: number;
};

export const DiscussionRow: React.FunctionComponent<OwnProps> = ({
  message,
  author,
  vote
}) => {
  return (
    <div className="DiscussionRow__layout">
      <Button rightIcon="caret-up" minimal text={vote} />
      <div className="DiscussionRow__content">
        <p className="DiscussionRow__message">{message}</p>
        <span className="bp3-text-disabled">{author}</span>
      </div>
    </div>
  );
};
