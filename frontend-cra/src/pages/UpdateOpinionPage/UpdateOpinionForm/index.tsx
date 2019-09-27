import React, { useState, useEffect } from "react";
import * as FinalForm from "react-final-form";
import _ from "lodash";

import { TextArea, Button, Callout } from "@blueprintjs/core";

import { FinalInputGroup } from "../../../components/FinalInputGroup";
import { updateOpinion, getOpinion } from "../../../api/opinion";
import { useTokenFromUrl } from "../../../hooks/useTokenFromUrl";
import { OPINION_TYPE } from "../../../constants/type";

import "./style.css";

type FormShape = {
  description: string;
};

export const UpdateOpinionForm: React.FunctionComponent = () => {
  const [originalOpinion, updateOriginalOpinion] = useState<
    OPINION_TYPE | undefined
  >();
  const { encodedToken, decodedToken, hasValidToken } = useTokenFromUrl(3);

  const onSubmit: FinalForm.FormProps<FormShape>["onSubmit"] = async ({
    description
  }) => {
    if (!encodedToken) {
      return;
    }

    await updateOpinion({ token: encodedToken, description });
  };

  useEffect(() => {
    if (!encodedToken || !decodedToken) {
      return;
    }

    getOpinion({ id: decodedToken.id }).then(opinion => {
      updateOriginalOpinion(opinion);
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
    <FinalForm.Form<FormShape> onSubmit={onSubmit}>
      {({ handleSubmit, pristine, invalid }) => {
        return (
          <form className="UpdateOpinionForm" onSubmit={handleSubmit}>
            <h3>Original:</h3>
            <Callout>
              {originalOpinion && <p>{originalOpinion.description}</p>}
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
