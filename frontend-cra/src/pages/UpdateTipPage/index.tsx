import React from "react";

import { Section } from "../ModulePage/Section";
import { UpdateTipForm } from "./UpdateTipForm";

type FormShape = {
  description: string;
};

export const UpdateTipPage: React.FunctionComponent = () => {
  return <Section leftHeader={<h1>Update tip</h1>} body={<UpdateTipForm />} />;
};
