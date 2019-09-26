import React from "react";
import algoliaSearch from "algoliasearch";
import { InstantSearch, Configure } from "react-instantsearch-dom";

import { RequiresAuth } from "../../components/RequiresAuth";
import { Center } from "../../components/Center";

import { AlgoliaSearchBox } from "./AlgoliaSearchBox";
import { AlgoliaHits } from "./AlgoliaHits";

import "./style.css";

const {
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_SEARCH_KEY
} = process.env;

if (!REACT_APP_ALGOLIA_APPLICATION_ID || !REACT_APP_ALGOLIA_SEARCH_KEY) {
  throw new Error("Missing Algolia Search keys!");
}

const algoliaClient = algoliaSearch(
  REACT_APP_ALGOLIA_APPLICATION_ID,
  REACT_APP_ALGOLIA_SEARCH_KEY
);

export const HomePage: React.FunctionComponent = () => {
  return (
    <RequiresAuth>
      <Center>
        <div className="HomePage__searchbar-container">
          <InstantSearch indexName="modules" searchClient={algoliaClient}>
            <Configure hitsPerPage={8} />
            <AlgoliaSearchBox />
            <br />
            <AlgoliaHits />
          </InstantSearch>
          {/* <InputGroup
            type="search"
            leftIcon="search"
            placeholder="Search for a module or lecturer..."
            large
          /> */}
        </div>
      </Center>
    </RequiresAuth>
  );
};
