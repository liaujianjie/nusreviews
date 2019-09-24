import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { StoreState } from "../../store";
import { loadFromLoadStorage } from "../../store/auth";
import { useRouter } from "../../hooks/useRouter";
import { Redirect } from "react-router";

const mapStateToProps = (rootState: StoreState) => ({
  isAuthenticated: Boolean(rootState.auth.accessToken),
  isAuthenticating: rootState.auth.authenticating
});
const mapDispatchToProps = {
  loadAuthStateFromLocalStorage: loadFromLoadStorage
};
type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const _RequiresNoAuth: React.FunctionComponent<ConnectedProps> = ({
  isAuthenticating,
  isAuthenticated,
  loadAuthStateFromLocalStorage,
  children
}) => {
  const { location } = useRouter();
  const isAuthPage = _.startsWith(location.pathname, "/auth");

  useEffect(() => {
    loadAuthStateFromLocalStorage();
  }, [loadAuthStateFromLocalStorage]);

  if (!isAuthenticating && isAuthPage && isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export const RequiresNoAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RequiresNoAuth);

export default {};
