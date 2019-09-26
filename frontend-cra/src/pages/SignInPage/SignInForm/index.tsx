import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, FormProps, Field } from "react-final-form";
import _ from "lodash";

import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { FinalInputGroup } from "../../../components/FinalInputGroup";
import { signIn } from "../../../store/auth";

import "./style.css";

type FormShape = {
  email: string;
  password: string;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ signIn }, dispatch);
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const _SignInForm: React.FunctionComponent<DispatchProps> = ({ signIn }) => {
  const handleSubmit: FormProps<FormShape>["onSubmit"] = async credentials => {
    await signIn(credentials);
  };
  return (
    <Form<FormShape>
      onSubmit={handleSubmit}
      initialValues={{ email: "", password: "" }}
    >
      {({ handleSubmit, submitting, pristine, invalid }) => {
        return (
          <form className="SignInForm__form" onSubmit={handleSubmit}>
            <Field
              name="email"
              component={FinalInputGroup}
              validate={value =>
                !_.endsWith(value, "@u.nus.edu")
                  ? "You need to login with a NUS student email."
                  : undefined
              }
              placeholder="e0123456a@u.nus.edu"
              leftIcon={IconNames.USER}
              large
            />
            <Field
              name="password"
              component={FinalInputGroup}
              validate={value =>
                _.isEmpty(value) ? "Password cannot be empty." : undefined
              }
              placeholder="Password"
              type="password"
              leftIcon={IconNames.LOCK}
              large
            />
            <Button
              type="submit"
              intent={Intent.PRIMARY}
              large
              loading={submitting}
              disabled={pristine || invalid || submitting}
            >
              Sign in
            </Button>
          </form>
        );
      }}
    </Form>
  );
};

export const SignInForm = connect(
  null,
  mapDispatchToProps
)(_SignInForm);
