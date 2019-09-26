import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import {
  Navbar,
  Alignment,
  Button,
  Popover,
  Menu,
  MenuItem,
  Divider
} from "@blueprintjs/core";

import { MaxWidthContainer } from "../../MaxWidthContainer";
import { StoreState } from "../../../store";
import { signOut } from "../../../store/auth";
import { useRouter } from "../../../hooks/useRouter";
import logo from "./logo.svg";
import "./style.css";

const mapStateToProps = (rootState: StoreState) => ({
  user: rootState.auth.accessToken
});
const mapDispatchToProps = { signOut };
type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const _Navigation: React.FunctionComponent<ConnectedProps> = ({
  user,
  signOut
}) => {
  // Temporarily use private APIs so that we can use the router state as a hook
  const { history } = useRouter();

  return (
    <Navbar className="Navigation">
      <MaxWidthContainer>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <Link to="/">
              <img src={logo} alt="NUS Reviews logo" height={20} />
            </Link>
          </Navbar.Heading>
          <Navbar.Divider />
          <Link to="/">
            <Button minimal icon="search" text="Search" />
          </Link>
        </Navbar.Group>
        {user && (
          <Navbar.Group align={Alignment.RIGHT}>
            <Popover
              minimal
              position="bottom-right"
              content={
                <Menu>
                  <MenuItem text="Profile" icon="user" />
                  <Divider />
                  <MenuItem text="Sign out" icon="log-out" onClick={signOut} />
                </Menu>
              }
            >
              <Button minimal text={user.email} />
            </Popover>
          </Navbar.Group>
        )}
        {!user && (
          <Navbar.Group align={Alignment.RIGHT}>
            <Link to="/auth/signin">
              <Button minimal text="Sign in" />
            </Link>
          </Navbar.Group>
        )}
      </MaxWidthContainer>
    </Navbar>
  );
};

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Navigation);
