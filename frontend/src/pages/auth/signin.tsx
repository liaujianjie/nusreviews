import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { Link } from "gatsby";
import * as FinalForm from "react-final-form";
import * as _ from "lodash";

import { Grid, Form, Button, Image } from "semantic-ui-react";
import { FinalFormInput } from "../../components/FinalFormInput";
import { AuthLogoContainer } from "../../components/AuthLogoContainer";
import logo from "../../static/images/logo.svg";
import { signIn } from "../../store/auth";

type SignInField = {
  email: string;
  password: string;
};

type OwnProps = {};

const SignInPage: React.FunctionComponent<OwnProps & DispatchProps> = ({
  signIn
}) => {
  const submit: FinalForm.FormProps<SignInField>["onSubmit"] = async (
    payload: SignInField
  ) => {
    await signIn(payload);
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
              <Link to="/auth/signup">
                <Button
                  basic
                  type="button"
                  color="blue"
                  fluid
                  size="large"
                  style={{ marginTop: 16 }}
                >
                  Sign up for a NUS Reviews account
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
  signIn: typeof signIn;
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  signIn
};

export default connect(
  null,
  mapDispatchToProps
)(SignInPage);
