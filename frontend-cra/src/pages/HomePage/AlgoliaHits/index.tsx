import React from "react";
import { connectHits } from "react-instantsearch-dom";
import { Menu, Card } from "@blueprintjs/core";
import _ from "lodash";

import { AlgoliaHit } from "../AlgoliaHit";

import "./style.css";

export const AlgoliaHits = connectHits(({ hits }) => {
  return (
    <Card className="AlgoliaHits">
      <Menu>
        {_.map(hits).map((hit, index) => {
          return (
            <>
              <AlgoliaHit hit={hit} />
              {/* {hits.length - 1 !== index && <Divider />} */}
            </>
          );
        })}
      </Menu>
    </Card>
  );
});
