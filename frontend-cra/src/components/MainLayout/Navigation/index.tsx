import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
  Navbar,
  Alignment,
  Button,
  InputGroup,
  Popover,
  Menu,
  MenuItem
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
  const { location } = useRouter();

  const shouldShowSearchbar =
    location.pathname !== "/" && !_.startsWith(location.pathname, "/auth");

  return (
    <Navbar className="Navigation">
      <MaxWidthContainer>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <img src={logo} alt="NUS Reviews logo" height={20} />
          </Navbar.Heading>
        </Navbar.Group>
        {shouldShowSearchbar && (
          <Navbar.Group>
            <InputGroup type="search" leftIcon="search"></InputGroup>
          </Navbar.Group>
        )}
        {user && (
          <Navbar.Group align={Alignment.RIGHT}>
            <Popover
              minimal
              position="bottom-right"
              content={
                <Menu>
                  <MenuItem text="Sign out" onClick={signOut} />
                </Menu>
              }
            >
              <Button minimal text={user.username} />
            </Popover>
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
