import React from "react";
import { InputGroup } from "@blueprintjs/core";

import { RequiresAuth } from "../../components/RequiresAuth";
import { Center } from "../../components/Center";

import "./style.css";

export const HomePage: React.FunctionComponent = () => {
  return (
    <RequiresAuth>
      <Center>
        <div className="HomePage__searchbar-container">
          <InputGroup
            type="search"
            leftIcon="search"
            placeholder="Search for a module or lecturer..."
            large
          />
        </div>
      </Center>
    </RequiresAuth>
  );
};
