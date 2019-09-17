import * as React from "react";
// external component libraries
import * as Final from "react-final-form";
import { Form, Header, Segment, Grid, Button } from "semantic-ui-react";
// components
import { withLayout } from "../components/Layout";
import RadioButtonGroup from "../components/Form/RadioButton";
import LongTextInput from "../components/Form/LongTextInput";
import ShortTextInput from "../components/Form/ShortTextInput";
import DropDown from "../components/Form/DropDown";
// interfaces
import { LongFormReviewInput } from "../components/Form/Form";
// constants
import {
  grades,
  lecturerQuestions,
  workloadQuestions
} from "../constants/Form";

interface RadioFormQuestion {
  scale: number;
  name: string;
  question: string;
  value: Array<string>;
}

interface FormSegmentProps {
  bgColor?: string;
  children: React.ReactNode;
}

const FormSegment: React.FunctionComponent<Form> = props => {
  return (
    <Segment
      basic
      padded
      style={{
        backgroundColor: props.bgColor,
        border: "2px solid white",
        margin: "0px"
      }}
    >
      {props.children}
    </Segment>
  );
};

const ModuleDetail = () => {
  return (
    <FormSegment bgColor="white">
      <Header as="h2" style={{ display: "inline" }}>
        CS3216
        <Header.Subheader
          style={{
            display: "inline",
            color: "#747474",
            background: "#F2F2F2",
            borderRadius: "0.2em",
            padding: "0.3em",
            marginLeft: "0.2em",
            fontWeight: "1000"
          }}
        >
          AY2019/2020, SEM1
        </Header.Subheader>
      </Header>

      <Grid columns="equal">
        <Grid.Column floated="left">
          Software Product Engineering for Digital Markets
        </Grid.Column>
        <Grid.Column floated="right" textAlign="right">
          Do as you wish, there are no compulsory fields
        </Grid.Column>
      </Grid>

      <DropDowns />
    </FormSegment>
  );
};

const DropDowns = () => {
  return (
    <Grid textAlign="center">
      <DropDown
        name="expectedGrade"
        placeholder={grades[0].text}
        options={grades}
        question="Expected Grade"
      />
      <DropDown
        name="actualGrade"
        placeholder={grades[0].text}
        options={grades}
        question="Actual Grade"
      />
    </Grid>
  );
};

const LongForm = () => {
  const onSave = (values: LongFormReviewInput) => {
    window.alert("draft saved");
    console.log(JSON.stringify(values, 0, 2));
  };

  const onSubmit = (values: LongFormReviewInput) => {
    window.alert("Form submitted!");
    console.log(JSON.stringify(values, 0, 2));
  };

  const getRadioButtons = (questionSet: Array<RadioFormQuestion>) => {
    return questionSet.map(values => <RadioButtonGroup {...values} />);
  };

  return (
    <Final.Form onSubmit={onSubmit}>
      {({ handleSubmit, form, values }) => (
        <Form
          onSubmit={e => {
            handleSubmit(e);
            form.reset();
          }}
        >
          <ModuleDetail />
          <FormSegment>{getRadioButtons(lecturerQuestions)}</FormSegment>

          <FormSegment bgColor="white">
            {getRadioButtons(workloadQuestions)}
          </FormSegment>

          <FormSegment>
            <LongTextInput
              name="lecturerInput"
              placeholder="Occaecat deserunt est consectetur veniam ut cupidatat labore veniam non labore ad ex do."
              value={values["lecturerInput"]}
              question="How was your lecturer Ben Leong?"
            />
            <LongTextInput
              name="tutorInput"
              placeholder="Qui irure veniam adipisicing ex nulla ad commodo nulla ullamco est anim."
              value={values["tutorInput"]}
              question="How was your lecturer Ben Leong?"
            />
          </FormSegment>
          <FormSegment bgColor="white">
            <Grid style={{ justifyContent: "flex-end" }}>
              <Button onClick={(e, data) => onSave({ target: data })}>
                Save Draft
              </Button>
              <Form.Button type="submit">Submit</Form.Button>
            </Grid>
          </FormSegment>
        </Form>
      )}
    </Final.Form>
  );
};

export default withLayout(LongForm);
