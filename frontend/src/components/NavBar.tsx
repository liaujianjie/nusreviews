import * as React from "react";
import { Menu, Search, Image, Container, Button } from "semantic-ui-react";
import logo from "../static/images/logo.svg";
import { connect, MapDispatchToProps } from "react-redux";
import { signOut } from "../store/auth";

type OwnProps = {};

const NavBar: React.FunctionComponent<OwnProps & DispatchProps> = ({
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
            <span style={{ marginRight: 16 }}>Jennie Kim</span>
            <Button onClick={signOut} basic>
              Sign out
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

type DispatchProps = {
  signOut: typeof signOut;
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  signOut
};

export default connect(
  null,
  mapDispatchToProps
)(NavBar);
