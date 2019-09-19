import * as React from "react";

export const AuthLogoContainer: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "48px",
      width: "100%"
    }}
  >
    {children}
  </div>
);
