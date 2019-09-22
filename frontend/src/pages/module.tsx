import * as React from "react";
import { withLayout } from "../components/Layout";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Label,
  Menu,
  Item,
  Segment,
  Progress
} from "semantic-ui-react";
import ActionButton from "../components/ActionButton";
import Section from "../components/Section";
import RatingCard from "../components/RatingCard";
import ShortReview from "../components/Form/ShortReview";
import { SHORT_REVIEW_TIPS, SHORT_REVIEW_OPINION } from "../constants/Form";

export const ratings = [
  {
    name: "Workload",
    value: 3
  },
  {
    name: "Bell curve",
    value: 2
  },
  {
    name: "Lecturer",
    value: 4.2
  },
  {
    name: "Workload",
    value: 3
  },
  {
    name: "Bell curve",
    value: 2
  },
  {
    name: "Lecturer",
    value: 4.2
  }
];

const DetailSection = () => {
  return (
    <Section
      topLeft={
        <Header as="h2">
          CS3216
          <Header.Subheader>
            Software Product Engineering for Digital Markets
          </Header.Subheader>
        </Header>
      }
      body={
        <p>
          In this module, students will practice software product engineering by
          working in small teams to develop well-tested, user-friendly,
          production-quality software for the real world. To support this goal,
          students work closely with users to understand their problems, gather
          their requirements, and obtain their feedback through a rapid,
          iterative, application design and development process. Students will
          also be exposed to practical issues for digital markets such as
          growing the user base of their application, deployment of the
          application on the Web or in the cloud system, and validating the UI
          design and UX of the application.
        </p>
      }
    />
  );
};

const RatingSection = () => {
  const semesterOptions = [
    {
      key: "1920sem1",
      text: "AY 2019/2020, SEM 1",
      value: "1920sem1"
    },
    {
      key: "1819sem2",
      text: "AY 2018/2019, SEM 2",
      value: "1819sem2"
    },
    {
      key: "1819sem1",
      text: "AY 2018/2019, SEM 1",
      value: "1819sem1"
    }
  ];

  return (
    <Section
      topLeft={
        <Dropdown
          multiple
          selection
          header="Choose a semester"
          options={semesterOptions}
          defaultValue={semesterOptions[0].value}
        />
      }
      topRight={<ActionButton icon="plus" name="Add Rating" />}
      body={<RatingCard ratings={ratings} />}
    />
  );
};

const DiscussionSection = () => {
  const opinions = [
    {
      name: "Computer Science, Y4, AY17/18",
      value:
        "I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
    },
    {
      name: "Computer Science, Y4, AY17/18",
      value:
        "I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
    },
    {
      name: "Computer Science, Y4, AY17/18",
      value:
        "I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
    }
  ];

  const tips = [
    {
      name: "Computer Science, Y4, AY17/18",
      value:
        "I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
    },
    {
      name: "Computer Science, Y4, AY17/18",
      value:
        "I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
    },
    {
      name: "Computer Science, Y4, AY17/18",
      value:
        "I found the module surprisingly beautiful but in a horribly uncomfortable kinda way."
    }
  ];

  return (
    <Section
      topLeft="STUDENT DISCUSSION"
      body={
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <h5>What were the best parts?</h5>
              <Item.Group>
                {opinions.map(rating => (
                  <Item>
                    <Item.Content>
                      <Item.Description>{rating.value}</Item.Description>
                      <Item.Extra>{rating.name}</Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            </Grid.Column>
            <Grid.Column width={8}>
              <h5>Any tips and tricks?</h5>
              <Item.Group>
                {tips.map(rating => (
                  <Item>
                    <Item.Content>
                      <Item.Description>{rating.value}</Item.Description>
                      <Item.Extra>{rating.name}</Item.Extra>
                    </Item.Content>
                  </Item>
                ))}
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row textAlign="center">
            <Grid.Column width={8}>
              <ShortReview buttonName="Add Tip" {...SHORT_REVIEW_TIPS} />
            </Grid.Column>
            <Grid.Column width={8}>
              <ShortReview buttonName="Add Opinion" {...SHORT_REVIEW_OPINION} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      action={{
        name: "View more",
        icon: "chevron down"
      }}
    />
  );
};

const LongReviewSection = () => {
  const reviews = [
    {
      expected: "B+",
      actual: "A-",
      semester: "AY2019/2020, SEM 1",
      value:
        "How was the lecturer, Ben Leong? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explaining the answers for the tutorials. If you want a tutor who goes through the answers step by step, I suggest you attend Dr. Chong’s classes. How’s the tutors? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explai..",
      name: "Computer Science, Y4, AY17/18",
      ratings: {
        lecturer: 90,
        workload: 75,
        interesting: 75,
        verdict: 100
      }
    },
    {
      expected: "B+",
      actual: "A-",
      semester: "AY2019/2020, SEM 1",
      value:
        "How was the lecturer, Ben Leong? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explaining the answers for the tutorials. If you want a tutor who goes through the answers step by step, I suggest you attend Dr. Chong’s classes. How’s the tutors? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explai..",
      name: "Computer Science, Y4, AY17/18",
      ratings: {
        lecturer: 90,
        workload: 75,
        interesting: 75,
        verdict: 100
      }
    },
    {
      expected: "B+",
      actual: "A-",
      semester: "AY2019/2020, SEM 1",
      value:
        "How was the lecturer, Ben Leong? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explaining the answers for the tutorials. If you want a tutor who goes through the answers step by step, I suggest you attend Dr. Chong’s classes. How’s the tutors? Lincoln is good at re-teaching the main points from the previous lecture but he rushes through when explai..",
      name: "Computer Science, Y4, AY17/18",
      ratings: {
        lecturer: 90,
        workload: 75,
        interesting: 75,
        verdict: 100
      }
    }
  ];

  return (
    <Section
      topLeft="DETAILED REVIEW"
      topRight={<ActionButton icon="plus" name="Add Review" />}
      body={
        <div>
          {reviews.map((rating, index) => (
            <Grid>
              <Grid.Row>
                <Grid.Column floated="left" width={5}>
                  <Label>
                    Expected <Label.Detail>{rating.expected}</Label.Detail>
                  </Label>
                  <Label>
                    Actual <Label.Detail>{rating.actual}</Label.Detail>
                  </Label>
                </Grid.Column>
                <Grid.Column floated="right" width={5} textAlign="right">
                  <Label floated="right">{rating.semester}</Label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: "0em", paddingBottom: "0em" }}>
                <Grid.Column>
                  <p>
                    {rating.value}
                    <span style={{ color: "#fc4838" }}>(more)</span>
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={12}>
                  <p>
                    {Object.keys(rating.ratings).map(key => (
                      <span style={{ marginRight: "2em" }}>
                        <b>
                          {key.charAt(0).toUpperCase() + key.substring(1)}:{" "}
                        </b>
                        {rating.ratings[key]}
                      </span>
                    ))}
                  </p>
                </Grid.Column>
                <Grid.Column width={4} textAlign="right">
                  <b>{rating.name}</b>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ))}
        </div>
      }
      action={{
        name: "View more",
        icon: "chevron down"
      }}
    />
  );
};

const ModulePage = () => {
  return (
    <div>
      <DetailSection />
      <RatingSection />
      <DiscussionSection />
      <LongReviewSection />
    </div>
  );
};

export default withLayout(ModulePage);
