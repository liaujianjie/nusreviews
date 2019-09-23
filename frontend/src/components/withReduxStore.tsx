import * as React from "react";
import { Provider } from "react-redux";

import { store } from "../store";

export const withReduxStore = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  class WithReduxStore extends React.Component<P> {
    render() {
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
