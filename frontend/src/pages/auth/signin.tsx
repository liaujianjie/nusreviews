import * as React from "react";
import { Grid, Header, Form, Button, Divider } from "semantic-ui-react";

const SignInPage = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          NUS Reviews
        </Header>
        <Form size="large">
          {/* <Segment stacked> */}
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="e01234567@u.nus.edu"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Button color="blue" fluid size="large">
            Login
          </Button>
        </Form>
        <Divider />
        <Button color="grey" fluid size="large">
          Sign up
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default SignInPage;
