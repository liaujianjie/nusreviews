import React from "react";

import "./style.css";

type OwnProps = {
  onClickAdd?: React.MouseEvent<HTMLButtonElement>;
};

export const DiscussionColumn: React.FunctionComponent<OwnProps> = ({
  children
}) => {
  return (
    <div>
      <div className="DiscussionColumn__rows-container">{children}</div>
    </div>
  );
};
