import React from "react";
import { InputGroup } from "@blueprintjs/core";

import { RequiresAuth } from "../components/RequiresAuth";
import { Center } from "../components/Center";

export const HomePage: React.FunctionComponent = () => {
  return (
    <RequiresAuth>
      <Center>
        <InputGroup
          type="search"
          leftIcon="search"
          placeholder="Search for a module or lecturer..."
          large
        ></InputGroup>
      </Center>
    </RequiresAuth>
  );
};
