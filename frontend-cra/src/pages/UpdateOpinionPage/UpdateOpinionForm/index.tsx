import React from "react";
import * as FinalForm from "react-final-form";
import _ from "lodash";

import { TextArea, Button, Callout } from "@blueprintjs/core";

import { FinalInputGroup } from "../../../components/FinalInputGroup";
import { updateOpinion } from "../../../api/opinion";
import { useTokenFromUrl } from "../../../hooks/useTokenFromUrl";

import "./style.css";

type FormShape = {
  description: string;
};

export const UpdateOpinionForm: React.FunctionComponent = () => {
  const { encodedToken, hasValidToken } = useTokenFromUrl(4);

  const onSubmit: FinalForm.FormProps<FormShape>["onSubmit"] = async ({
    description
  }) => {
    if (!encodedToken) {
      return;
    }

    await updateOpinion({ token: encodedToken, description });
  };

  if (!hasValidToken) {
    return (
      <Callout intent="danger">
        The URL is malformed, please make sure that you have copy and pasted the
        link sent to your email correctly.
      </Callout>
    );
  }

  return (
    <FinalForm.Form<FormShape> onSubmit={onSubmit}>
      {({ handleSubmit, pristine, invalid }) => {
        return (
          <form className="UpdateOpinionForm" onSubmit={handleSubmit}>
            <h3>Original:</h3>
            <Callout>
              <p>Lorem ipsum</p>
            </Callout>
            <h3>Updated:</h3>
            <FinalForm.Field
              name="description"
              component={FinalInputGroup}
              validate={value =>
                _.isEmpty(value) ? "Opnion cannot be empty." : undefined
              }
            />
            <div className="UpdateOpinionForm__buttons-container">
              <Button
                large
                type="submit"
                intent="primary"
                text="Update my opinion"
                icon="tick"
                disabled={pristine || invalid}
              />
              <Button
                large
                intent="danger"
                icon="trash"
                text="Delete opinion"
              />
            </div>
          </form>
        );
      }}
    </FinalForm.Form>
  );
};
