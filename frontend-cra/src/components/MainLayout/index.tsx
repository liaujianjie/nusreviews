import React from "react";

import { MaxWidthContainer } from "../MaxWidthContainer";
import { Navigation } from "./Navigation";

export const MainLayout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <MaxWidthContainer>{children}</MaxWidthContainer>
      </main>
    </>
  );
};
