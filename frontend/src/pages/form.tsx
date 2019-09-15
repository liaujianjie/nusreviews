import * as React from "react";
// external component libraries
import * as Final from "react-final-form";
import { Form, Header, Segment, Grid } from "semantic-ui-react";
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

const ModuleDetail = () => {
  return (
    <React.Fragment>
      <Header as="h2" style={{ display: "inline" }}>
        CS3216
        <Header.Subheader
          style={{
            display: "inline",
            color: "#747474",
            background: "#F2F2F2",
            borderRadius: "8px",
            paddingLeft: "4px"
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
    </React.Fragment>
  );
};

const LongForm = () => {
  const onSubmit = (values: LongFormReviewInput) => {
    window.alert(JSON.stringify(values, 0, 2));
  };

  const getRadioButtons = (questionSet: Array<any>) => {
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
          <Segment clearing basic padded>
            <Form.Group widths="equal">
              <DropDown
                name="expectedGrade"
                placeholder={grades[0].text}
                options={grades}
                value={values.expectedGrade}
              >
                Expected Grade
              </DropDown>
              <DropDown
                name="actualGrade"
                placeholder={grades[0].text}
                options={grades}
                value={values.actualGrade}
              >
                Actual Grade
              </DropDown>
            </Form.Group>
          </Segment>

          {getRadioButtons(lecturerQuestions)}
          {getRadioButtons(workloadQuestions)}

          <Form.Group>
            <ShortTextInput name="name" placeholder="Name" value={values.name}>
              Name
            </ShortTextInput>
            <ShortTextInput
              name="realName"
              placeholder="RealName"
              value={values.realName}
            >
              Real Name
            </ShortTextInput>
          </Form.Group>

          <LongTextInput
            name="description"
            placeholder="The world was gonna roll me"
            value={values.description}
          >
            SOMEBODY ONCE TOLD ME
          </LongTextInput>

          <Form.Button type="submit">Submit</Form.Button>
        </Form>
      )}
    </Final.Form>
  );
};

export default withLayout(LongForm);
