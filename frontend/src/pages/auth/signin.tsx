import * as React from "react";
import { Form as FinalForm, Field, FormProps } from "react-final-form";
import * as _ from "lodash";

import { Grid, Header, Form, Button, Divider } from "semantic-ui-react";
import { FinalFormInput } from "../../components/FinalFormInput";

type SignInPayload = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const submit: FormProps<SignInPayload>["onSubmit"] = (
    payload: SignInPayload
  ) => {
    // Simulate async HTTP request
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        alert(JSON.stringify(payload));
        resolve();
      }, 2000);
    });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          NUS Reviews
        </Header>
        <FinalForm<SignInPayload>
          initialValues={{ email: "", password: "" }}
          onSubmit={submit}
        >
          {({ handleSubmit, submitting, pristine, invalid }) => (
            <Form error size="large">
              <Field
                component={FinalFormInput}
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="e01234567@u.nus.edu"
                disabled={submitting}
                validate={value =>
                  !_.endsWith(value, "@u.nus.edu")
                    ? "You need to login with a NUS student email."
                    : undefined
                }
                autofocus
              />
              <Field
                component={FinalFormInput}
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                disabled={submitting}
                validate={value =>
                  _.isEmpty(value) ? "Password cannot be empty." : undefined
                }
              />
              <Button
                color="blue"
                size="large"
                fluid
                onClick={() => handleSubmit()}
                disabled={pristine || invalid || submitting}
                loading={submitting}
              >
                Login
              </Button>
            </Form>
          )}
        </FinalForm>
        <Divider />
        <Button color="grey" fluid size="large">
          Sign up
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default SignInPage;
