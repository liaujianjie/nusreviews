import * as React from "react";

import { Card, Container, Rating, Header, Button } from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import RatingCard from "../components/RatingCard";
import { ratings } from "./module";
import Section from "../components/Section";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { CurrentRefinements } from "react-instantsearch-dom";
import { InstantSearch } from "react-instantsearch-dom";
import { withAuth } from "../components/withAuth";

const Details = hits => {
  const ModuleOptions = [
    {
      key: "1920sem1",
      code: "CS3216",
      name: "Software Product Engineering for Digital Markets",
      value: 5,
      description:
        "In this module, students will practice software product engineering by working in small teams to develop well-tested, user-friendly, production-quality software for the real world. To support this goal, students work closely with users to understand their problems, gather their requirements, and obtain their feedback through a rapid, iterative, application design and development process. Students will also be exposed to practical issues for digital markets such as growing the user base of their application, deployment of the application on the Web or in the cloud system, and validating the UI design and UX of the application."
    },
    {
      key: "Sem1",
      code: "CS3210",
      name: "I'm a stupid mod",
      value: 3,
      description: "Ahhhhhh"
    }
  ];

  return hits.map(hit => (
    <Card.Group>
      <Card color="orange" fluid>
        <Card.Content extra>
          <Section
            topLeft={
              <a href="../module">
                <Header as="h2">
                  {hit.moduleCode}
                  <Header.Subheader style={{ color: "black" }}>
                    {hit.title}
                  </Header.Subheader>
                </Header>
              </a>
            }
            topRight={
              <b style={{ color: "black" }}>
                Overall Rating:
                <Rating icon="star" defaultRating={0} maxRating={5} disabled />
              </b>
            }
            body={
              <div>
                <p style={{ color: "black" }}>
                  {hit.description}
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
  ));
};

const ModuleList = (hasMore, refineNext) => {
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
          <header className="header">
            <CustomInfiniteHits />
            <Button disabled={!hasMore} onClick={refineNext}>
              Show more
            </Button>
          </header>
        </InstantSearch>
      </Container>
    </div>
  );
};


const CustomInfiniteHits = connectInfiniteHits(Details);
export default withLayout(ModuleList);
