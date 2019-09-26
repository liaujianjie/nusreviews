import React, { ChangeEvent } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import { InputGroup } from "@blueprintjs/core";

export const AlgoliaSearchBox = connectSearchBox(
  ({ refine, currentRefinement, isSearchStalled }) => (
    <InputGroup
      autoFocus
      type="search"
      leftIcon="search"
      placeholder="Search for a module or lecturer..."
      large
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        refine(event.target.value)
      }
      value={currentRefinement}
    />
  )
);
