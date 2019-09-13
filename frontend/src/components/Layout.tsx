import { Link } from "gatsby";
import * as React from "react";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import { Segment, Icon, Container, Sidebar, Button } from "semantic-ui-react";
import "../css/styles.css";
import "../css/responsive.css";
import "../css/semantic.min.css";
import "prismjs/themes/prism-okaidia.css";
import { Provider } from "react-redux";
import { store } from "../store";
import octopus from "../assets/octopus.png";
import { NONAME } from "dns";
import { color } from "@storybook/addon-knobs";

export const menuItems = [
  { name: "Home", path: "/", exact: true, icon: "home", inverted: true },
  { name: "About", path: "/about/", exact: true, icon: "info circle" },
  { name: "Blog", path: "/blog/", exact: false, icon: "newspaper" }
];

export interface LayoutProps {
  location: {
    pathname: string;
  };
  children: any;
}

const Layout = (props: LayoutProps) => {
  const { pathname } = props.location;
  const isHome = pathname === "/";

  return (
    <Provider store={store}>
      <Sidebar.Pushable as={Segment}>
        <SidebarMenu
          Link={Link}
          pathname={pathname}
          items={menuItems}
          visible={false}
        />

        <Sidebar.Pusher style={{ minHeight: "100vh" }}>
          {/* Header */}
          {isHome ? null : (
            <HeaderMenu Link={Link} pathname={pathname} items={menuItems} />
          )}

          {/* Render children pages */}
          <div style={{ paddingBottom: 150 }}>{props.children}</div>

          {/* Footer */}
          <Segment
            color="purple"
            vertical
            style={{ position: "absolute", bottom: 0, width: "100%" }}
          >
            <Container textAlign="center">
              <div class="ui two column grid">
                <div class="left aligned four wide column">
                  <button
                    style={{ background: "none", padding: 0, border: "none" }}
                  >
                    <img
                      src={octopus}
                      style={{ maxBlockSize: 100 }}
                      alt="click to review module"
                    />
                  </button>
                </div>
                <div class="twelve wide column">
                  <div class="row">
                    <h3>
                      <br />
                      <Icon name="warning sign" color="red" /> To preserve the
                      safe space of this community, we ask that you do not
                      personally identify or reveal any students from your
                      reviews.
                    </h3>
                  </div>
                </div>
              </div>
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Provider>
  );
};

export default Layout;

export const withLayout = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) =>
  class WithLayout extends React.Component<P & LayoutProps> {
    render() {
      return (
        <Layout location={this.props.location}>
          <WrappedComponent {...this.props} />
        </Layout>
      );
    }
  };
