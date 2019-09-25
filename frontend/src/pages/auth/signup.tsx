import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { Link } from "gatsby";
import * as FinalForm from "react-final-form";
import * as _ from "lodash";

import { Grid, Form, Button, Image } from "semantic-ui-react";
import { FinalFormInput } from "../../components/FinalFormInput";
import { AuthLogoContainer } from "../../components/AuthLogoContainer";
import logo from "../../static/images/logo.svg";
import { signUp } from "../../store/auth";
import { withReduxStore } from "../../components/withReduxStore";
import { withAuth } from "../../components/withAuth";

type SignUpField = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

type OwnProps = {};

const SignUpPage: React.FunctionComponent<OwnProps & DispatchProps> = ({
  signUp
}) => {
  const submit: FinalForm.FormProps<
    SignUpField
  >["onSubmit"] = async credentials => {
    await signUp(credentials);
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <AuthLogoContainer>
          <Image src={logo} alt="logo" size="medium" />
        </AuthLogoContainer>
        <FinalForm.Form<SignUpField>
          initialValues={{ email: "", password: "", passwordConfirmation: "" }}
          onSubmit={submit}
        >
          {({ handleSubmit, submitting, pristine, invalid, values }) => (
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
                autoFocus
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
              <FinalForm.Field
                component={FinalFormInput}
                name="passwordConfirmation"
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
                disabled={submitting}
                validate={value => {
                  if (_.isEmpty(value)) {
                    return "Password cannot be empty.";
                  }
                  if (value !== values.password) {
                    return "Passwords do not match.";
                  }
                }}
              />
              <Button
                color="blue"
                size="large"
                fluid
                onClick={() => handleSubmit()}
                disabled={pristine || invalid || submitting}
                loading={submitting}
              >
                Create NUS Reviews account
              </Button>
              <Link to="/auth/signin">
                <Button
                  basic
                  type="button"
                  color="blue"
                  fluid
                  size="large"
                  style={{ marginTop: 16 }}
                >
                  Already have an account? Click here to log in!
                </Button>
              </Link>
            </Form>
          )}
        </FinalForm.Form>
      </Grid.Column>
    </Grid>
  );
};

type DispatchProps = {
  signUp: typeof signUp;
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  signUp
};

export default withAuth(
  withReduxStore(
    connect(
      null,
      mapDispatchToProps
    )(SignUpPage)
  )
);
