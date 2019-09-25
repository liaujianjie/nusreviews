import * as React from "react";
import { Menu, Search, Image, Container, Button } from "semantic-ui-react";
import logo from "../static/images/logo.svg";
import { InstantSearch } from "react-instantsearch-dom";
import { connectSearchBox } from "react-instantsearch/connectors";

const HeaderSearchBox = ({ currentRefinement, refine }) => (
  <Search
    color="blue"
    fluid
    size="large"
    placeholder="Search a module"
    input={{ fluid: true }}
    value={this.state.searchState.query}
    onSearchChange={event => refine(event.currentTarget.value)}
  />
);

type OwnProps = {};

const NavBar: React.FunctionComponent<OwnProps & ConnectedProps> = ({
  username,
  signOut
}) => {
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
              appId="3EJTXIKS8B"
              apiKey="092aa257d26c6e1fb8733a3c0229b176"
              indexName="modules"
            >
              <CustomSearchBox />
            </InstantSearch>
          </Menu.Item>
          <Menu.Item>
            <span style={{ marginRight: 16 }}>{username}</span>
            <Button onClick={signOut} basic>
              Sign out
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;
const mapStateToProps = (rootState: StoreState) => ({
  username: rootState.auth.accessToken
    ? rootState.auth.accessToken.username
    : ""
});
const mapDispatchToProps = {
  signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
