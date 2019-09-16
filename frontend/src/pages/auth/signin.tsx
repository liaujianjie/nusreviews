import * as React from "react";
import * as FinalForm from "react-final-form";
import * as _ from "lodash";

import { Grid, Form, Button, Divider, Image } from "semantic-ui-react";
import { FinalFormInput } from "../../components/FinalFormInput";
import { AuthLogoContainer } from "../../components/AuthLogoContainer";
import logo from "../../static/images/logo.svg";

type SignInField = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const submit: FinalForm.FormProps<SignInField>["onSubmit"] = (
    payload: SignInField
  ) => {
    // Simulate async HTTP request
    return new Promise(resolve => {
      setTimeout(() => {
        alert(JSON.stringify(payload));
        resolve();
      }, 2000);
    });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <AuthLogoContainer>
          <Image src={logo} alt="logo" size="medium" />
        </AuthLogoContainer>
        <FinalForm.Form<SignInField>
          initialValues={{ email: "", password: "" }}
          onSubmit={submit}
        >
          {({ handleSubmit, submitting, pristine, invalid }) => (
            <Form error size="large">
              <FinalForm.Field
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
              <FinalForm.Field
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
        </FinalForm.Form>
        <Divider />
        <Button color="grey" fluid size="large">
          Sign up
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default SignInPage;
