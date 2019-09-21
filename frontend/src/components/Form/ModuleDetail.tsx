import * as React from "react";

import { Header, Grid } from "semantic-ui-react";
import { GRADES } from "../../constants/Form";
import FormSegment from "./FormSegment";
import DropDown from "./DropDown";

interface ModuleDetailProps {
  bgColor: string;
  moduleCode: string;
  moduleSemester: string;
  moduleTitle: string;
}

const ModuleDetail = (props: ModuleDetailProps) => {
  return (
    <FormSegment bgColor={props.bgColor}>
      <Header as="h2" style={{ display: "inline" }}>
        {props.moduleCode}
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
          {props.moduleSemester}
        </Header.Subheader>
      </Header>

      <Grid columns="equal">
        <Grid.Column floated="left">{props.moduleTitle}</Grid.Column>
        <Grid.Column floated="right" textAlign="right">
          Do as you wish, there are no compulsory fields
        </Grid.Column>
      </Grid>

      <Grid textAlign="center">
        <DropDown
          name="expectedGrade"
          placeholder={GRADES[0].text}
          options={GRADES}
          question="Expected Grade"
        />
        <DropDown
          name="actualGrade"
          placeholder={GRADES[0].text}
          options={GRADES}
          question="Actual Grade"
        />
      </Grid>
    </FormSegment>
  );
};

export default ModuleDetail;
