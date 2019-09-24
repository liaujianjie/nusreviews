import React from "react";

import { Navigation } from "./Navigation";

export const MainLayout: React.FunctionComponent = ({ children }) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </div>
  );
};
