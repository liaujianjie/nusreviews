import React from "react";

import { Section } from "../ModulePage/Section";
import { UpdateOpinionForm } from "./UpdateOpinionForm";

type FormShape = {
  description: string;
};

export const UpdateOpinionPage: React.FunctionComponent = () => {
  return (
    <Section
      leftHeader={<h1>Update opinion</h1>}
      body={<UpdateOpinionForm />}
    />
  );
};
