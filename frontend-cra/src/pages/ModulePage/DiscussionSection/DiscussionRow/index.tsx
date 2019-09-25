import React from "react";

import "./style.css";

type OwnProps = {
  message: string;
  author: string;
};

export const DiscussionRow: React.FunctionComponent<OwnProps> = ({
  message,
  author
}) => {
  return (
    <div>
      <p className="DiscussionRow__message">{message}</p>
      <span className="bp3-text-disabled">{author}</span>
    </div>
  );
};
