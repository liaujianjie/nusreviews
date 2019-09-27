import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Button, Callout } from "@blueprintjs/core";

import { useTokenFromUrl } from "../../../hooks/useTokenFromUrl";
import { verifyEmail } from "../../../api/auth";

import "./style.css";

export const VerifyEmailForm: React.FunctionComponent = () => {
  const [status, updateStatus] = useState<
    "unverified" | "verifying" | "verified"
  >("unverified");
  const { encodedToken, decodedToken } = useTokenFromUrl(3);

  useEffect(() => {
    if (!encodedToken) {
      return;
    }

    updateStatus("verifying");
    verifyEmail({ token: encodedToken })
      .then(() => updateStatus("verified"))
      .catch(error => {
        console.error(error);
        updateStatus("unverified");
      });
  }, [encodedToken]);

  if (status === "verified") {
    return (
      <p>
        You have successfully verified your account, welcome fam! You may now
        leave rating and reviews for modules.
      </p>
    );
  }

  if (!encodedToken || !decodedToken) {
    return (
      <Callout intent="danger">
        The URL is malformed, please make sure that you have copy and pasted the
        link sent to your email correctly.
      </Callout>
    );
  }

  return (
    <>
      <Button
        fill
        large
        text="Verify my email"
        intent="primary"
        loading={status === "verifying"}
        disabled={status === "verifying"}
        onClick={() => {
          updateStatus("verifying");
          verifyEmail({ token: encodedToken })
            .then(() => updateStatus("verified"))
            .catch(error => {
              console.error(error);
              updateStatus("unverified");
            });
        }}
      />
    </>
  );
};
