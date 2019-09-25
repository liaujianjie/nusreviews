import * as React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { withLayout } from "../components/Layout";
import RatingCard from "../components/RatingCard";
import { ratings } from "./module";
import { Section } from "../Section";
import {
  Highlight,
  InfiniteHits,
  Configure,
  connectSearchBox,
  InstantSearch
} from "react-instantsearch-dom";
import { connectStateResults } from "react-instantsearch/connectors";
import { withAuth } from "../components/withAuth";

const SearchBoxContainer = connectSearchBox(() => <span />); // this one is the one for the header I am trying to redirect the search result from the header to the result page.
const SemanticSearchBox = (
  { currentRefinement, refine } // this is extra searchbox
) => (
  <Search
    color="blue"
    fluid
    size="massive"
    placeholder="Search modules or lecturers"
    input={{ fluid: true }}
    value={currentRefinement}
    onSearchChange={event => refine(event.currentTarget.value)}
    showNoResults={false}
  />
);

function Hit(props: { hit: any }) {
  return (
    <Card.Group>
      <Card interactive={true} elevation={Elevation.TWO}>
        <Card.Content extra>
          <Section
            topLeft={
              <a href="../module">
                <Header as="h2">
                  <Highlight attribute="moduleCode" hit={props.hit} />
                  <Headers.Subheader style={{ color: "black" }}>
                    <Highlight attribute="faculty" hit={props.hit} />
                  </Header.Subheader>
                </Header>
              </a>
            }
            body={
              <div>
                <p style={{ color: "black" }}>
                  <Highlight attribute="description" hit={props.hit} />
                  <br />
                  <br />
                  <RatingCard ratings={ratings} />
                </p>
              </div>
            }
          />
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

const StateResults = ({ searchResults, searchState }) => {
  return searchResults && searchResults.nbHits !== 0 ? (
    <div>
      <h1>
        Search results found for <strong>{searchState.query}</strong>:
      </h1>
      <InfiniteHits hitComponent={Hit} />
    </div>
  ) : (
    <div>
      <h1>
        No results found for <strong>{searchState.query}</strong>.
      </h1>
    </div>
  );
};

const ModuleList = () => {
  const state = {
    searchState: {
      query: ""
    }
  };

  const handleInputChange = (event: {
    persist: () => void;
    target: { value: any };
  }) => {
    event.persist();

    this.setState((state: { searchState: any }) => ({
      searchState: {
        ...state.searchState,
        query: event.target.value
      }
    }));
  };
  return (
    <div>
      <div
        style={{
          marginTop: "6rem"
        }}
      >
        <InstantSearch
          appId="3EJTXIKS8B"
          apiKey="092aa257d26c6e1fb8733a3c0229b176"
          indexName="modules"
        >
          <Configure hitsPerPage={10} />
          <div>
            <CustomSearchBox />
          </div>

          <CustomStateResults />
        </InstantSearch>
      </div>
    </div>
  );
};
const CustomSearchBox = connectSearchBox(SemanticSearchBox);
const CustomStateResults = connectStateResults(StateResults);
export default withLayout(ModuleList);
