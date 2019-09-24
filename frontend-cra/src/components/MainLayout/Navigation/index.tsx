import React, { useContext } from "react";
import { __RouterContext as RouterContext } from "react-router";
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

import logo from "./logo.svg";
import "./style.css";

export const Navigation: React.FunctionComponent = () => {
  // Temporarily use private APIs so that we can use the router state as a hook
  const { location } = useContext(RouterContext);

  // Hide navbar in home page and in auth pages
  if (location.pathname === "/" || _.startsWith(location.pathname, "/auth")) {
    return null;
  }

  return (
    <Navbar className="Navigation">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <img src={logo} alt="NUS Reviews logo" />
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group>
        <InputGroup type="search" leftIcon="search"></InputGroup>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover
          minimal
          position="bottom-right"
          content={
            <Menu>
              <MenuItem text="Sign out"></MenuItem>
            </Menu>
          }
        >
          <Button minimal text="jianjie@u.nus.edu" />
        </Popover>
      </Navbar.Group>
    </Navbar>
  );
};
