import React from "react";

import {
  Navbar,
  Alignment,
  Button,
  Text,
  InputGroup,
  Popover,
  Menu,
  MenuItem
} from "@blueprintjs/core";

import logo from "./logo.svg";
import "./style.css";

export const Navigation: React.FunctionComponent = () => {
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
