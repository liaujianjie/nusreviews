import * as React from "react";
import { Menu, Search, Image, Container, Button } from "semantic-ui-react";
import logo from "../static/images/logo.svg";
import { connect } from "react-redux";
import { signOut } from "../store/auth";
import { StoreState } from "../store";

type OwnProps = {};

const NavBar: React.FunctionComponent<OwnProps & ConnectedProps> = ({
  username,
  signOut
}) => {
  return (
    <Menu fixed="top" verticalAlign="middle" borderless>
      <Container>
        <Menu.Item>
          <a href="../home">
            <Image src={logo} alt="logo" size="small" />
          </a>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Search size="mini" fluid placeholder="Search a module" />
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
