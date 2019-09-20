import * as React from "react";
import { Divider, Grid, Segment } from "semantic-ui-react";
import ActionButton from "./ActionButton";

type Props = {
  topLeft: React.ReactNode,
  topRight: React.ReactNode,
  body: React.ReactNode,
  action: {
    name: string,
    icon: string,
  }
}

const Section = (props: Props) => {
  const { topLeft, topRight, body, action } = props;
  return (
    <div
      style={{
        marginBottom: "1em",
        padding: "1em",
        background: "#fff",
        borderRadius: "0.3em",
      }}
    >
      <Segment 
        style = {{
          borderWidth: "0px",
        }}
        attached='top'
      >
        <Grid verticalAlign='middle'>
          <Grid.Column floated='left' width={10}>
            {topLeft}
          </Grid.Column>
          <Grid.Column floated='right' width={6} textAlign='right'>
            {topRight}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment 
        attached
        style = {{
          borderWidth: "0px",
        }}
      > 
        {body} 
      </Segment>
      { action && 
        <Segment 
          attached
          style = {{
            borderWidth: "0px",
          }}
          textAlign='center'
        >
          <ActionButton name={action.name} icon={action.icon} transparent/>
        </Segment>
      }
    </div>
  )
};

export default Section;
