import React from "react";

import { Button, Card } from "@blueprintjs/core";

import { RequiresNoAuth } from "../../components/RequiresNoAuth";
import { Center } from "../../components/Center";
import { SignUpForm } from "./SignUpForm";
import logo from "./logo.svg";
import { useRouter } from "../../hooks/useRouter";

import "./style.css";

export const SignUpPage: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <RequiresNoAuth>
      <Center>
        <Card>
          <div className="SignUpPage__logo-container">
            <Center>
              <img src={logo} height={32} alt="NUS Reviews logo" />
            </Center>
          </div>
          <div className="SignUpPage__form-container">
            <SignUpForm />
          </div>
          <div className="SignUpPage__signup-button-container">
            <Button
              type="submit"
              large
              minimal
              onClick={() => router.history.push("/auth/signin")}
            >
              Already have an account? Sign in here!
            </Button>
          </div>
        </Card>
      </Center>
    </RequiresNoAuth>
  );
};
