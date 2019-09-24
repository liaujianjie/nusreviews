import React from "react";
import { RequiresAuth } from "../components/RequiresAuth";

export const ModulePage: React.FunctionComponent = () => {
  return (
    <RequiresAuth>
      <div>page</div>
    </RequiresAuth>
  );
};
