import * as React from "react";
// external component libraries
import * as Final from "react-final-form";
import { Form, Grid, Button } from "semantic-ui-react";
// components
import { withLayout } from "../components/Layout";
import FormSegment from "../components/Form/FormSegment";
import RadioButtonGroup from "../components/Form/RadioButtonGroup";
import LongTextInput from "../components/Form/LongTextInput";
import ModuleDetail from "../components/Form/ModuleDetail";
// constants
import { LECTURER_QUESTIONS, WORKLOAD_QUESTIONS } from "../constants/Form";
// hoc
import { withAuth } from "../components/withAuth";

interface RadioFormQuestion {
  scale: number;
  name: string;
  question: string;
  value: Array<string>;
}

const getRadioButtons = (questionSet: Array<RadioFormQuestion>) => {
  return questionSet.map(values => <RadioButtonGroup {...values} />);
};

// names of form fields
export type LongFormReviewInput = {
  expectedGrade: string;
  actualGrade: string;
  name: string;
  lecturerInput: string;
  tutorInput: string;
  moduleInput: string;
  workloadInput: string;
  workloadProject: string;
  workloadQuiz: string;
  interestInput: string;
  recommendInput: string;
};

const LongForm = () => {
  const onSave = (values: LongFormReviewInput) => {
    window.alert("Draft saved!" + values);
  };

  const onSubmit = (values: LongFormReviewInput) => {
    window.alert("Form submitted!" + JSON.stringify(values, 0, 2));
  };

  return (
    // initialValues for following up on drafts
    <Final.Form onSubmit={onSubmit} initialValues={{}}>
      {({ handleSubmit, form, values, pristine }) => (
        <Form
          onSubmit={e => {
            handleSubmit(e);
            form.reset();
          }}
        >
          <ModuleDetail
            bgColor="white"
            moduleCode="CS3216"
            moduleTitle="Software Product Engineering for Digital Markets"
            moduleSemester="AY2019/2020, SEM1"
          />
          <FormSegment>{getRadioButtons(LECTURER_QUESTIONS)}</FormSegment>

          <FormSegment bgColor="white">
            {getRadioButtons(WORKLOAD_QUESTIONS)}
          </FormSegment>

          <FormSegment>
            <LongTextInput
              name="lecturerInput"
              placeholder="Tell me more maybe about the teaching style, energy during the module, attitude towards attendance..."
              value={values.lecturerInput}
              question="How was your lecturer Ben Leong?"
            />
            <LongTextInput
              name="tutorInput"
              placeholder="Tell me more maybe about the teaching style, energy during class, attitude towards attendance"
              value={values.tutorInput}
              question="How's the tutor?"
            />
          </FormSegment>
          <FormSegment bgColor="white">
            <LongTextInput
              name="moduleInput"
              placeholder="You could talk about what you generally learnt, took away from the module..."
              value={values.moduleInput}
              question="What was the module about?"
            />
          </FormSegment>

          <FormSegment>
            <LongTextInput
              name="workloadInput"
              placeholder="Maybe what preparation was needed for each class, time taken and effort needed for projects/assignments"
              value={values.workloadInput}
              question="How was the workload (preparation, project, assignments)"
            />
            <LongTextInput
              name="workloadProject"
              placeholder="What were the deliverables for the project? How big was the team? Did you get to choose the team?"
              value={values.workloadProject}
              question="What were the projects like?"
            />
            <LongTextInput
              name="workloadQuiz"
              placeholder="Tell me more about its format, preparation needed..."
              value={values.workloadQuiz}
              question="How was the quizzes/exams?"
            />
          </FormSegment>

          <FormSegment bgColor="white">
            <LongTextInput
              name="interestInput"
              placeholder="Anything memorable, anything that you enjoyed during classes..."
              value={values.interestInput}
              question="Was it interesting?"
            />
          </FormSegment>

          <FormSegment>
            <LongTextInput
              name="recommendInput"
              placeholder="Who do you think would really enjoy and/or do well in this module?"
              value={values.recommendInput}
              question="Would you recommend it to me?"
            />
          </FormSegment>

          <FormSegment bgColor="white">
            <Grid style={{ justifyContent: "flex-end" }}>
              <Button
                control={<button onClick={e => onSave(values)} />}
                type="draft"
              >
                Save Draft
              </Button>
              <Form.Button type="submit" disabled={pristine}>
                Submit
              </Form.Button>
            </Grid>
          </FormSegment>
        </Form>
      )}
    </Final.Form>
  );
};

export default withLayout(LongForm);
