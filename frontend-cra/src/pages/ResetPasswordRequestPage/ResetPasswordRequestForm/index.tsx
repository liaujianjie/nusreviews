import React, { useState } from "react";
import { Form, FormProps, Field } from "react-final-form";
import _ from "lodash";

import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { FinalInputGroup } from "../../../components/FinalInputGroup";
import { requestPasswordReset } from "../../../api/auth";

import "./style.css";

type FormShape = {
  email: string;
};

export const ResetPasswordRequestForm: React.FunctionComponent = () => {
  const [requested, updateRequested] = useState(false);
  const handleSubmit: FormProps<FormShape>["onSubmit"] = async ({ email }) => {
    try {
      await requestPasswordReset({ email });
      updateRequested(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (requested) {
    return (
      <p>
        Your request to reset your password has been received. Please check your
        email for instructions on how to reset!
      </p>
    );
  }

  return (
    <Form<FormShape> onSubmit={handleSubmit} initialValues={{ email: "" }}>
      {({ handleSubmit, submitting, pristine, invalid, values }) => {
        return (
          <form className="ResetPasswordForm__form" onSubmit={handleSubmit}>
            <Field
              name="email"
              component={FinalInputGroup}
              validate={value =>
                !_.endsWith(value, "@u.nus.edu")
                  ? "You need to provide a valid NUS student email address."
                  : undefined
              }
              placeholder="e0123456a@u.nus.edu"
              leftIcon={IconNames.USER}
              large
            />
            <Button
              type="submit"
              intent={Intent.PRIMARY}
              large
              loading={submitting}
              disabled={pristine || invalid || submitting}
            >
              Reset my password
            </Button>
          </form>
        );
      }}
    </Form>
  );
};
