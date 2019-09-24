import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { StoreState } from "../../store";
import { loadFromLoadStorage } from "../../store/auth";
import { useRouter } from "../../hooks/useRouter";
import { Redirect } from "react-router";

const mapStateToProps = (rootState: StoreState) => ({
  isAuthenticated: Boolean(rootState.auth.accessToken)
});
const mapDispatchToProps = {
  loadAuthStateFromLocalStorage: loadFromLoadStorage
};
type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

// @ts-ignore
const _RequiresAuth: React.FunctionComponent<ConnectedProps> = ({
  isAuthenticated,
  loadAuthStateFromLocalStorage,
  children
}) => {
  const { location } = useRouter();
  const isAuthPage = _.startsWith(location.pathname, "/auth");

  useEffect(() => {
    loadAuthStateFromLocalStorage();
  }, []);

  if (!isAuthPage && !isAuthenticated) {
    console.log({ isAuthPage, isAuthenticated });
    return <Redirect to="/auth/signin" />;
  }

  return children;
};

export const RequiresAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RequiresAuth);

export default {};
