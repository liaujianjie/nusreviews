import * as React from "react";
import { Card, Container, Rating, Icon } from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import ActionButton from "../components/ActionButton";
import Section from "../components/Section";
import RatingCard from "../components/RatingCard";

const Details = () => {
  const ModuleOptions = [
    {
      key: "1920sem1",
      code: "CS3216",
      name: "Software Product Engineering for Digital Markets",
      value: 3,
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

  return ModuleOptions.map(mod => (
    <Card.Group >
      <Card color="orange" fluid>
        <Card.Content extra>
        <h1>{mod.code + " " + mod.name}</h1>
        Overall Rating:<Rating icon="star" defaultRating={mod.value} maxRating={5} />
        </Card.Content>
        <Card.Content description={mod.description} />
      </Card>
    </Card.Group>
  ));
};

const ModuleList = () => {
  return (
    
    <div>
     
      <Container
        style={{
          marginTop: "6rem"
        }}
      >
         <h1>Search Results for CS321:</h1>
        <Details />
      </Container>
    </div>
  );
};

export default withLayout(ModuleList);
