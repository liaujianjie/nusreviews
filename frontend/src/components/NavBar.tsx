import * as React from "react";
import { Menu, Search, Image, Container } from "semantic-ui-react";
import logo from "../static/images/logo.svg";

const NavBar = () => {
  return (
    <Menu fixed="top" verticalAlign="middle" borderless>
      <Container>
        <Menu.Item>
          <a href="../index">
            <Image src={logo} alt="logo" size="small" />
          </a>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Search size="mini" fluid placeholder="Search a module" />
          </Menu.Item>
          <Menu.Item>
            <Image
              src="https://66.media.tumblr.com/d4743332c9f25d147aac03ec12b9c9a2/tumblr_ory27uhmTl1w84hv9o6_250.jpg"
              avatar
            />
            <span>Jennie Kim</span>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default NavBar;
