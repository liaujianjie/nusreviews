import React from "react";
import { BasicDoc } from "react-instantsearch-core";
import { MenuItem } from "@blueprintjs/core";

export const AlgoliaHit: React.FunctionComponent<{ hit: BasicDoc }> = ({
  hit
}) => {
  return (
    <MenuItem
      text={
        <div>
          <div>
            <strong>{hit.moduleCode}</strong> <span>{hit.title}</span>
          </div>
          <div className="bp3-text-muted">{hit.department}</div>
        </div>
      }
    />
  );
};
