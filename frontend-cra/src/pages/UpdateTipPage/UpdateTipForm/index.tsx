import React, { useState, useEffect } from "react";
import * as FinalForm from "react-final-form";
import _ from "lodash";

import { Button, Callout } from "@blueprintjs/core";

import { FinalTextArea } from "../../../components/FinalTextArea";
import { updateTip, getTip } from "../../../api/tip";
import { useTokenFromUrl } from "../../../hooks/useTokenFromUrl";
import { TIP_TYPE } from "../../../constants/type";

import "./style.css";

type FormShape = {
  description: string;
};

export const UpdateTipForm: React.FunctionComponent = () => {
  const [originalTip, updateOriginalTip] = useState<TIP_TYPE | undefined>();
  const { encodedToken, decodedToken, hasValidToken } = useTokenFromUrl(3);

  const onSubmit: FinalForm.FormProps<FormShape>["onSubmit"] = async ({
    description
  }) => {
    if (!encodedToken) {
      return;
    }

    await updateTip({ token: encodedToken, description });
    updateOriginalTip({ ...originalTip!, description });
  };

  useEffect(() => {
    if (!encodedToken || !decodedToken) {
      return;
    }

    getTip({ id: decodedToken.id })
      .then(tip => updateOriginalTip(tip))
      .catch(error => {
        // TODO: handle error for when are unable to get the current tip
      });
    // Ignore exhaustive deps rule because encodedToken is a string representation
    // of a decodedToken.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encodedToken]);

  if (!hasValidToken) {
    return (
      <Callout intent="danger">
        The URL is malformed, please make sure that you have copy and pasted the
        link sent to your email correctly.
      </Callout>
    );
  }

  return (
    <FinalForm.Form<FormShape>
      onSubmit={onSubmit}
      initialValues={{
        description: (originalTip && originalTip.description) || ""
      }}
    >
      {({ handleSubmit, pristine, invalid }) => {
        return (
          <form className="UpdateTipForm" onSubmit={handleSubmit}>
            <h3>Original:</h3>
            <Callout>{originalTip && <p>{originalTip.description}</p>}</Callout>
            <h3>Updated:</h3>
            <FinalForm.Field
              name="description"
              component={FinalTextArea}
              validate={value =>
                _.isEmpty(value) ? "Opnion cannot be empty." : undefined
              }
            />
            <div className="UpdateTipForm__buttons-container">
              <Button
                large
                type="submit"
                intent="primary"
                text="Update my tip"
                icon="tick"
                disabled={pristine || invalid}
              />
              <Button large intent="danger" icon="trash" text="Delete my tip" />
            </div>
          </form>
        );
      }}
    </FinalForm.Form>
  );
};
