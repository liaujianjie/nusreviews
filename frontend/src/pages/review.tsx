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
  Pagination,
  Progress,
} from "semantic-ui-react";
import Section from "../components/Section";
import RatingCard from "../components/RatingCard";
import { getReview } from "../services/api";
import { 
  QUESTIONS_TYPE,
  RATINGS_TYPE,
  REVIEW_DETAIL_TYPE 
} from "../constants/types";

const QuestionSection = (props: { questions: QUESTIONS_TYPE }) => {
  return (
    <Item.Group>
      {props.questions.map((question, index) => (
        <Item>
          <Item.Content>
            <Item.Header>{question.question}</Item.Header>
            <Item.Description>{question.answer}</Item.Description>
            <Divider
              section={(index < props.questions.length - 1)} 
              hidden={(index == props.questions.length - 1)}
            />
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

const ModulePage = () => {
  const review = getReview();

  return (
    <Section
      topLeft={
        <Header as="h2">
          {review.module_code} <Label>{review.semester}</Label>
          <Header.Subheader style={{ marginTop: '0.5em' }}>
            {review.module_name}
          </Header.Subheader>
        </Header>
      }
      topRight={review.student}
      body={
        <div>
          <Label basic color='orange'>
            Expected <Label.Detail>{review.expected_grade}</Label.Detail>
          </Label>
          <Label basic color='orange'>
            Actual <Label.Detail>{review.actual_grade}</Label.Detail>
          </Label>
          <Divider section/>
          <RatingCard ratings={review.ratings}/>
          <Divider section/>
          <QuestionSection questions={review.questions}/>
          <div style={{textAlign: 'center'}}>
            <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={10}
            />
          </div>
        </div>
      }
    />
  )
};

export default withLayout(ModulePage);
