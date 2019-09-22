import * as React from "react";
import { connect } from "react-redux";
import { RouterProps, Redirect } from "@reach/router";
import * as _ from "lodash";

import { StoreState } from "../store";
import { withReduxStore } from "./withReduxStore";
import { AuthenticationToken } from "../store/auth";

const mapStateToProps = (rootState: StoreState) => ({
  accessToken: rootState.auth.accessToken
});

type OwnProps = {
  accessToken: AuthenticationToken;
};

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  withReduxStore(
    connect(mapStateToProps)(
      class WithAuth extends React.Component<P & RouterProps & OwnProps> {
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
