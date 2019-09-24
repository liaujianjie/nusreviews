import * as React from "react";
import { Provider } from "react-redux";
import { Container } from "semantic-ui-react";
import { RouterProps } from "@reach/router";

import NavBar from "./NavBar";
import { store } from "../store";

import "../css/styles.css";
import "../css/responsive.css";
import "../css/semantic.min.css";
import "prismjs/themes/prism-okaidia.css";

const Layout: React.FunctionComponent<RouterProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <div>
        <NavBar />
        <Container
          style={{
            marginTop: "6rem",
            paddingBottom: "2rem"
          }}
        >
          {children}
        </Container>
      </div>
    </Provider>
  );
};

export default Layout;

export const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  class WithLayout extends React.Component<P & RouterProps> {
    render() {
      return (
        <Layout location={this.props.location}>
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  };
