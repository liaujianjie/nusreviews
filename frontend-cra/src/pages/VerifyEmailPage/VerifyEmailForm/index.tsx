import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Button, Callout } from "@blueprintjs/core";

import { useRouter } from "../../../hooks/useRouter";
import { verifyEmail } from "../../../api/auth";

import "./style.css";
import { decode } from "jsonwebtoken";

export const VerifyEmailForm: React.FunctionComponent = () => {
  const [hasVerified, updateHasVerified] = useState<
    "unverified" | "verifying" | "verified"
  >("unverified");
  const { location } = useRouter();
  const splitPathname = _.split(location.pathname, "/");
  const token = splitPathname.length === 4 ? _.last(splitPathname)! : "";
  let decodedToken = { email: "" };
  try {
    decodedToken = decode(token) as typeof decodedToken;
  } catch (error) {}

  useEffect(() => {
    updateHasVerified("verifying");
    verifyEmail({ token })
      .then(() => updateHasVerified("verified"))
      .catch(error => {
        console.error(error);
        updateHasVerified("unverified");
      });
  }, [token]);

  if (hasVerified) {
    return (
      <p>
        You have successfully verified your account, welcome fam! You may now
        leave rating and reviews for modules.
      </p>
    );
  }

  if (!token || !decodedToken) {
    return (
      <Callout intent="danger">
        The URL is malformed, please make sure that you have copy and pasted the
        link sent to your email correctly.
      </Callout>
    );
  }

  return (
    <Button
      fill
      large
      text="Verify email"
      intent="primary"
      loading={hasVerified === "verifying"}
      disabled={hasVerified === "verifying"}
      onClick={() => {
        updateHasVerified("verifying");
        verifyEmail({ token })
          .then(() => updateHasVerified("verified"))
          .catch(error => {
            console.error(error);
            updateHasVerified("unverified");
          });
      }}
    />
  );
};
