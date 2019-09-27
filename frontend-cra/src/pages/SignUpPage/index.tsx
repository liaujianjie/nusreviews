import React from "react";

import { Card, Icon } from "@blueprintjs/core";

import { RequiresNoAuth } from "../../components/RequiresNoAuth";
import { Center } from "../../components/Center";
import { AuthCardContainer } from "../../components/AuthCardContainer";
import { useRouter } from "../../hooks/useRouter";
import { SignUpForm } from "./SignUpForm";

import "./style.css";

export const SignUpPage: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <RequiresNoAuth>
      <Center>
        <AuthCardContainer>
          <Card interactive onClick={() => router.history.push("/auth/signin")}>
            <Icon icon="arrow-left" /> <span>Go back to sign in page</span>
          </Card>
          <Card>
            <div className="SignUpPage__logo-container">
              <Center>
                <h1>Sign up</h1>
              </Center>
            </div>
            <div className="SignUpPage__form-container">
              <SignUpForm />
            </div>
          </Card>
        </AuthCardContainer>
      </Center>
    </RequiresNoAuth>
  );
};
