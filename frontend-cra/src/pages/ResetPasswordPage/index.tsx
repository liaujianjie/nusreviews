import React from "react";

import { Card, Icon } from "@blueprintjs/core";

import { RequiresNoAuth } from "../../components/RequiresNoAuth";
import { Center } from "../../components/Center";
import { AuthCardContainer } from "../../components/AuthCardContainer";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { useRouter } from "../../hooks/useRouter";

import "./style.css";

export const ResetPasswordPage: React.FunctionComponent = () => {
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
                <h1>Change password</h1>
              </Center>
            </div>
            <div className="ResetPasswordRequestPage__form-container">
              <ResetPasswordForm />
            </div>
          </Card>
        </AuthCardContainer>
      </Center>
    </RequiresNoAuth>
  );
};
