import * as React from "react";
import { Link } from "gatsby";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import {Grid,Header,Search} from "semantic-ui-react";



const searchmodPage = () => {

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">

      <Grid.Column>
        <Header as="h1" color="teal" textAlign="center">
          NUS Reviews
        </Header>
        
          <Search color="blue" fluid size="massive" placeholder="Search"> 
          <input class = "prompt" type ="text" placeholder="Search"/>
          </Search>
        
      </Grid.Column>
    </Grid>
  );
};
export default withLayout(searchmodPage);
