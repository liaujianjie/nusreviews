import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";

import { store } from "./store";
import { MainLayout } from "./components/MainLayout";

import { HomePage } from "./pages/HomePage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ModulePage } from "./pages/ModulePage";

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth/signin" component={SignInPage} />
          <Route exact path="/auth/signup" component={SignUpPage} />
          <Route exact path="/module/:moduleId" component={ModulePage} />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
