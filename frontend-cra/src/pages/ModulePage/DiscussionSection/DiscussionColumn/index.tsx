import React from "react";

import "./style.css";

type OwnProps = {
  title: string;
  onClickAdd?: React.MouseEvent<HTMLButtonElement>;
};

export const DiscussionColumn: React.FunctionComponent<OwnProps> = ({
  title,
  children
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div className="DiscussionColumn__rows-container">{children}</div>
    </div>
  );
};
