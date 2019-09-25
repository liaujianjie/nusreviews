import React from "react";

import { Button, Card } from "@blueprintjs/core";

import { RequiresNoAuth } from "../../components/RequiresNoAuth";
import { Center } from "../../components/Center";
import { AuthCardContainer } from "../../components/AuthCardContainer";
import { SignInForm } from "./SignInForm";
import logo from "./logo.svg";
import { useRouter } from "../../hooks/useRouter";

import "./style.css";

export const SignInPage: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <RequiresNoAuth>
      <Center>
        <AuthCardContainer>
          <Card>
            <div className="SignInPage__logo-container">
              <Center>
                <img src={logo} height={32} alt="NUS Reviews logo" />
              </Center>
            </div>
            <div className="SignInPage__form-container">
              <SignInForm />
            </div>
            <div className="SignInPage__signup-button-container">
              <Button
                minimal
                fill
                alignText="left"
                onClick={() => router.history.push("/auth/signup")}
              >
                Create new account
              </Button>
              <Button
                minimal
                fill
                alignText="left"
                onClick={() =>
                  router.history.push("/auth/reset-password-request")
                }
              >
                Reset password
              </Button>
            </div>
          </Card>
        </AuthCardContainer>
      </Center>
    </RequiresNoAuth>
  );
};
