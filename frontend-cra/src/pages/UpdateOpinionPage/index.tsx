import React from "react";
import * as FinalForm from "react-final-form";
import _ from "lodash";

import { Section } from "../ModulePage/Section";

import "./style.css";
import { FinalInputGroup } from "../../components/FinalInputGroup";
import { TextArea, Button, Callout } from "@blueprintjs/core";

type FormShape = {
  description: string;
};

export const UpdateOpinionPage: React.FunctionComponent = () => {
  const onSubmit = () => {
    alert("submit presed ");
  };

  return (
    <Section
      leftHeader={<h1>Update opinion</h1>}
      body={
        <FinalForm.Form<FormShape> onSubmit={onSubmit}>
          {({ handleSubmit, pristine, invalid }) => {
            return (
              <form className="UpdateOpinionPage__form" onSubmit={handleSubmit}>
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
                <div className="UpdateOpinionPage__buttons-container">
                  <Button
                    large
                    type="submit"
                    intent="primary"
                    text="Update opinion"
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
      }
    />
  );
};
