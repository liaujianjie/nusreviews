import React, { useState } from "react";
import { Form, FormProps, Field } from "react-final-form";
import _ from "lodash";

import { Button, Intent, Callout } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { FinalInputGroup } from "../../../components/FinalInputGroup";
import { useTokenFromUrl } from "../../../hooks/useTokenFromUrl";
import { resetPassword } from "../../../api/auth";

import "./style.css";

type FormShape = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const ResetPasswordForm: React.FunctionComponent = () => {
  const [hasReset, updateHasReset] = useState(false);
  const { encodedToken, decodedToken } = useTokenFromUrl(3);

  const handleSubmit: FormProps<FormShape>["onSubmit"] = async ({
    password
  }) => {
    if (!encodedToken) {
      throw new Error("No token provided");
    }

    try {
      await resetPassword({ password, token: encodedToken });
      updateHasReset(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (hasReset) {
    return (
      <p>
        Your password has been reset, head back to the sign in page again to
        sign in!
      </p>
    );
  }

  if (!encodedToken || !decodedToken) {
    return (
      <Callout intent="danger">
        The URL is malformed, please make sure that you have copy and pasted the
        link sent to your email correctly.
      </Callout>
    );
  }

  return (
    <Form<FormShape>
      onSubmit={handleSubmit}
      initialValues={{
        password: "",
        passwordConfirmation: "",
        email: decodedToken.email
      }}
    >
      {({ handleSubmit, submitting, pristine, invalid, values }) => {
        return (
          <form className="ResetPasswordForm__form" onSubmit={handleSubmit}>
            <Field
              name="email"
              component={FinalInputGroup}
              leftIcon={IconNames.USER}
              large
              disabled
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
              Change my password
            </Button>
          </form>
        );
      }}
    </Form>
  );
};
