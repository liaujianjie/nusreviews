import React from "react";
import { BasicDoc } from "react-instantsearch-core";
import { MenuItem } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import "./style.css";

export const AlgoliaHit: React.FunctionComponent<{ hit: BasicDoc }> = ({
  hit
}) => {
  return (
    <MenuItem
      className="AlgoliaHit"
      text={
        <Link to={`/module/${hit.moduleCode}`}>
          <div>
            <div>
              <strong>{hit.moduleCode}</strong> <span>{hit.title}</span>
            </div>
            <div className="bp3-text-muted">{hit.department}</div>
          </div>
        </Link>
      }
    />
  );
};
