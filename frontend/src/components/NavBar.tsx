import * as React from "react";
import { Menu, Search, Image, Container } from "semantic-ui-react";
import logo from "../static/images/logo.svg";
import { InstantSearch } from "react-instantsearch-dom";
import { connectSearchBox } from "react-instantsearch/connectors";

const HeaderSearchBox = ({ currentRefinement, refine }) => (
  <Search
    color="blue"
    fluid
    size="small"
    placeholder="Search a module"
    input={{ fluid: true }}
    value={currentRefinement}
    onSearchChange={event => refine(event.currentTarget.value)}
  />
);

const NavBar = () => {
  return (
    <Menu fixed="top" verticalAlign="middle" borderless>
      <Container>
        <Menu.Item>
          <a href="../">
            <Image src={logo} alt="logo" size="small" />
          </a>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <InstantSearch
              apiKey="3EJTXIKS8B"
              appId="092aa257d26c6e1fb8733a3c0229b176"
              indexName="modules"
            >
              <CustomSearchBox />
            </InstantSearch>
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
const CustomSearchBox = connectSearchBox(HeaderSearchBox);
export default NavBar;
