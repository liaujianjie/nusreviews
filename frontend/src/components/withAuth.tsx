import * as React from "react";
import { connect } from "react-redux";
import { RouterProps, Redirect } from "@reach/router";
import * as _ from "lodash";

import { StoreState } from "../store";
import { withReduxStore } from "./withReduxStore";
import { loadFromLoadStorage } from "../store/auth";

const mapStateToProps = (rootState: StoreState) => ({
  accessToken: rootState.auth.accessToken,
  isAuthenticating: rootState.auth.authenticating
});
const mapDispatchToProps = {
  loadAuthStateFromLocalStorage: loadFromLoadStorage
};
type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

/**
 * A higher order function that redirects the user:
 * 1. To auth page if the user is not signed in and is on a non-auth page, or
 * 2. To index page if the user is signed in and is on an auth page.
 *
 * It also fetches the auth state from the local storage before mounting.
 */
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  withReduxStore(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(
      class WithAuth extends React.Component<P & RouterProps & ConnectedProps> {
        componentWillMount() {
          this.props.loadAuthStateFromLocalStorage();
        }

        render() {
          const isAuthPath = _.startsWith(
            this.props.location.pathname,
            "/auth"
          );
          if (isAuthPath && this.props.accessToken) {
            return <Redirect to="/" noThrow />;
          } else if (!isAuthPath && !this.props.accessToken) {
            return <Redirect to="/auth/signin" noThrow />;
          }

          return <WrappedComponent {...this.props} />;
        }
      }
    )
  );
