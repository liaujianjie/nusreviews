import React from "react";
import algoliaSearch from "algoliasearch";
import { InstantSearch, Configure } from "react-instantsearch-dom";

import { RequiresAuth } from "../../components/RequiresAuth";

import { AlgoliaSearchBox } from "./AlgoliaSearchBox";

import logo from "./logo.svg";
import "./style.css";
import { Center } from "../../components/Center";

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
    <div className="HomePage__searchbar-container">
      <InstantSearch indexName="modules" searchClient={algoliaClient}>
        <Configure hitsPerPage={8} />
        <Center>
          <div className="HomePage__logo-container">
            <img className="HomePage__logo" src={logo} alt="header" />
          </div>
        </Center>
        <AlgoliaSearchBox />
      </InstantSearch>
      {/* <InputGroup
            type="search"
            leftIcon="search"
            placeholder="Search for a module or lecturer..."
            large
          /> */}
    </div>
  );
};
