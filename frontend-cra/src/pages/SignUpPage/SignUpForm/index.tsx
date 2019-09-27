import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Form, FormProps, Field } from "react-final-form";
import _ from "lodash";

import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { FinalInputGroup } from "../../../components/FinalInputGroup";
import { signUp } from "../../../store/auth";

import "./style.css";

type FormShape = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      signUp
    },
    dispatch
  );
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

const _SignUpForm: React.FunctionComponent<DispatchProps> = ({ signUp }) => {
  const handleSubmit: FormProps<FormShape>["onSubmit"] = async credentials => {
    await signUp(credentials);
  };
  return (
    <Form<FormShape>
      onSubmit={handleSubmit}
      initialValues={{ email: "", password: "", passwordConfirmation: "" }}
    >
      {({ handleSubmit, submitting, pristine, invalid, values }) => {
        return (
          <form className="SignUpForm__form" onSubmit={handleSubmit}>
            <Field
              name="email"
              component={FinalInputGroup}
              validate={value =>
                !value
                  .split("@")[1]
                  .toString()
                  .includes("u.nus.edu")
                  ? "You need to sign up with your NUS student email in order to prove that your are an NUS student."
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
            <Field
              name="passwordConfirmation"
              component={FinalInputGroup}
              validate={value =>
                values.password !== value
                  ? "Passwords do not match."
                  : undefined
              }
              placeholder="Confirm password"
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
              Create my account
            </Button>
          </form>
        );
      }}
    </Form>
  );
};

export const SignUpForm = connect(
  null,
  mapDispatchToProps
)(_SignUpForm);
