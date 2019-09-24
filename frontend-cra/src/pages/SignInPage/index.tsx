import React from "react";

import { InputGroup, Button, Intent, Card } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { Center } from "../../components/Center";

import "./style.css";

export const SignInPage: React.FunctionComponent = () => {
  return (
    <Center>
      <Card>
        <div className="SignInPage__form-container">
          <InputGroup
            placeholder="e0123456a@u.nus.edu"
            // onChange={this.handleUsernameChange}
            // value={this.state.username}
            leftIcon={IconNames.USER}
            large
          />
          <InputGroup
            placeholder="Password"
            // onChange={this.handlePasswordChange}
            // value={this.state.password}
            type="password"
            leftIcon={IconNames.LOCK}
            large
          />
          <Button type="submit" intent={Intent.PRIMARY} large>
            Sign in
          </Button>
          {/* <span className="SignInPage--sign-up-prompt">
        Don't have an account?
        <br />
        <Link to="/auth/signup">Click here to sign up!</Link>
      </span> */}
        </div>
      </Card>
    </Center>
  );
};
