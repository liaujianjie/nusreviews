import React from "react";

import { Navigation } from "./Navigation";

export const MainLayout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </>
  );
};
