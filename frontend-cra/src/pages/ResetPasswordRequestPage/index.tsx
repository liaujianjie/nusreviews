import React from "react";

import { Card, Icon } from "@blueprintjs/core";

import { RequiresNoAuth } from "../../components/RequiresNoAuth";
import { Center } from "../../components/Center";
import { AuthCardContainer } from "../../components/AuthCardContainer";
import { ResetPasswordRequestForm } from "./ResetPasswordRequestForm";
import { useRouter } from "../../hooks/useRouter";

import "./style.css";

export const ResetPasswordRequestPage: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <RequiresNoAuth>
      <Center>
        <AuthCardContainer>
          <Card interactive onClick={() => router.history.push("/auth/signin")}>
            <Icon icon="arrow-left" /> <span>Go back to sign in page</span>
          </Card>
          <Card>
            <div className="ResetPasswordRequestPage__logo-container">
              <Center>
                <h1>Request for password reset</h1>
              </Center>
            </div>
            <div className="ResetPasswordRequestPage__form-container">
              <ResetPasswordRequestForm />
            </div>
          </Card>
        </AuthCardContainer>
      </Center>
    </RequiresNoAuth>
  );
};
