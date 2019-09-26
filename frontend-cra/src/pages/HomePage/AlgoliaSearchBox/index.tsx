import React, { ChangeEvent } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { InputGroup } from "@blueprintjs/core";

import { AlgoliaHits } from "../AlgoliaHits";

import "./style.css";

export const AlgoliaSearchBox = connectSearchBox(
  ({ refine, currentRefinement, isSearchStalled }) => (
    <>
      <InputGroup
        className="AlgoliaSearchBox"
        autoFocus
        leftIcon="search"
        placeholder="Search for a module..."
        large
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          refine(event.target.value)
        }
        value={currentRefinement}
      />
      {currentRefinement && <AlgoliaHits />}
    </>
  )
);
