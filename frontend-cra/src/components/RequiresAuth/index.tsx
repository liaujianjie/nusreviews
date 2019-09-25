import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import _ from "lodash";

import { StoreState } from "../../store";
import { loadFromLoadStorage } from "../../store/auth";
import { useRouter } from "../../hooks/useRouter";

const mapStateToProps = (rootState: StoreState) => ({
  isAuthenticated: Boolean(rootState.auth.accessToken),
  isAuthenticating: rootState.auth.authenticating
});
const mapDispatchToProps = {
  loadAuthStateFromLocalStorage: loadFromLoadStorage
};
type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const _RequiresAuth: React.FunctionComponent<ConnectedProps> = ({
  isAuthenticated,
  isAuthenticating,
  loadAuthStateFromLocalStorage,
  children
}) => {
  const { location } = useRouter();
  const isAuthPage = _.startsWith(location.pathname, "/auth");

  useEffect(() => {
    loadAuthStateFromLocalStorage();
  }, [loadAuthStateFromLocalStorage]);

  if (!isAuthenticating && !isAuthPage && !isAuthenticated) {
    return <Redirect to="/auth/signin" />;
  }

  return <>{children}</>;
};

export const RequiresAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RequiresAuth);

export default {};
