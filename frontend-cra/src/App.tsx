import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { store } from "./store";
import { MainLayout } from "./components/MainLayout";

import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ResetPasswordRequestPage } from "./pages/ResetPasswordRequestPage";
import { ModulePage } from "./pages/ModulePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LongReviewPage } from "./pages/LongReviewPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path="/auth/signin" component={SignInPage} />
            <Route exact path="/auth/signup" component={SignUpPage} />
            <Route
              exact
              path="/auth/reset-password/:token"
              component={ResetPasswordPage}
            />
            <Route
              exact
              path="/auth/reset-password-request"
              component={ResetPasswordRequestPage}
            />
            <Route
              exact
              path="/auth/verify-email/:token"
              component={VerifyEmailPage}
            />
            <Route exact path="/module/:moduleId" component={ModulePage} />
            <Route exact path="/review/:moduleId" component={LongReviewPage} />
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
