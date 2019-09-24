import * as React from "react";
import { Card, Container, Header } from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import RatingCard from "../components/RatingCard";
import { ratings } from "./module";
import Section from "../components/Section";
import { Highlight, InfiniteHits, Configure } from "react-instantsearch-dom";
import { CurrentRefinements } from "react-instantsearch-dom";
import { InstantSearch } from "react-instantsearch-dom";
import { withAuth } from "../components/withAuth";

function Hit(props) {
  return (
    <Card.Group>
      <Card color="orange" fluid>
        <Card.Content extra>
          <Section
            topLeft={
              <a href="../module">
                <Header as="h2">
                  <Highlight attribute="moduleCode" hit={props.hit} />
                  <Header.Subheader style={{ color: "black" }}>
                    <Highlight attribute="title" hit={props.hit} />
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

const ModuleList = () => {
  return (
    <div>
      <Container
        style={{
          marginTop: "6rem"
        }}
      >
        <h1>Search Results for {CurrentRefinements}:</h1>

        <InstantSearch
          apiKey="3EJTXIKS8B"
          appId="092aa257d26c6e1fb8733a3c0229b176"
          indexName="modules"
        >
          <Configure hitsPerPage={10} />
          <InfiniteHits hitComponent={Hit} />
        </InstantSearch>
      </Container>
    </div>
  );
};

export default withLayout(ModuleList);
