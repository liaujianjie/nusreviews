import React, { ChangeEvent } from "react";
import algoliaSearch from "algoliasearch";
import {
  InstantSearch,
  Configure,
  connectSearchBox,
  connectHits
} from "react-instantsearch-dom";
import { InputGroup, MenuItem, Menu, Card } from "@blueprintjs/core";
import _ from "lodash";

import { RequiresAuth } from "../../components/RequiresAuth";
import { Center } from "../../components/Center";

import "./style.css";
import { BasicDoc } from "react-instantsearch-core";

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

const AlgoliaSearchBox = connectSearchBox(
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

const AlgoliaHits = connectHits(({ hits }) => {
  return (
    <Card style={{ padding: 4 }}>
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

const AlgoliaHit: React.FunctionComponent<{ hit: BasicDoc }> = ({ hit }) => {
  return (
    // <div style={{ padding: 8 }}>
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
    // </div>
  );
};

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
