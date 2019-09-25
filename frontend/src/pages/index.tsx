import * as React from "react";
import {
  InstantSearch,
  CurrentRefinements,
  Hits
} from "react-instantsearch-dom";
import { connectSearchBox } from "react-instantsearch/connectors";
import { withLayout } from "../components/Layout";
import { Grid, Search } from "semantic-ui-react";
import logo from "../assets/logo.svg";
import { withAuth } from "../components/withAuth";

const SemanticSearchBox = ({ query, refine }) => (
  <Search
    color="blue"
    fluid
    size="massive"
    placeholder="Search modules or lecturers"
    input={{ fluid: true }}
    value={query}
    onSearchChange={event => refine(event.currentTarget.value)}
  />
);

const SearchPage = ({ query, onChange, onSubmit }) => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column>
        <img src={logo} alt="logo" style={{ minWidth: 450, padding: "4%" }} />

        <div class="ui center aligned grid">
          <div class="column">
            <InstantSearch
              appId="3EJTXIKS8B"
              apiKey="092aa257d26c6e1fb8733a3c0229b176"
              indexName="modules"
            >
              <header className="header">
                <CustomSearchBox />
                <Hits />
              </header>
            </InstantSearch>
          </div>
        </div>
      </Grid.Column>
    </Grid>
  );
};

const CustomSearchBox = connectSearchBox(SemanticSearchBox);
export default withLayout(SearchPage);
