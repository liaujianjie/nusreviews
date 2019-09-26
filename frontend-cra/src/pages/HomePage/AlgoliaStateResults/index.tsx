import React from "react";
import { connectStateResults } from "react-instantsearch-dom";
import _ from "lodash";
import { AlgoliaHits } from "../AlgoliaHits";
import "./style.css";

export const AlgoliaStateResults = connectStateResults(
  ({ searchResults, searchState }) => {
    return searchResults && searchResults.nbHits !== 0 ? (
      <AlgoliaHits />
    ) : (
      <div>
        No results found for <strong>{searchState.query}</strong>.
      </div>
    );
  }
);
