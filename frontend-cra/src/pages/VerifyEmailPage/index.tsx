import React from "react";

import { Card, Icon } from "@blueprintjs/core";

import { Center } from "../../components/Center";
import { AuthCardContainer } from "../../components/AuthCardContainer";
import { useRouter } from "../../hooks/useRouter";
import { VerifyEmailForm } from "./VerifyEmailForm";

import "./style.css";

export const VerifyEmailPage: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <Center>
      <AuthCardContainer>
        <Card interactive onClick={() => router.history.push("/")}>
          <Icon icon="arrow-left" /> <span>Go back</span>
        </Card>
        <Card>
          <div className="VerifyEmailRequestPage__logo-container">
            <Center>
              <h1>Email verification</h1>
            </Center>
          </div>
          <div className="VerifyEmailRequestPage__form-container">
            <VerifyEmailForm />
          </div>
        </Card>
      </AuthCardContainer>
    </Center>
  );
};
