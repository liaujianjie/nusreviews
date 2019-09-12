import * as React from "react";
import { withLayout } from "../components/Layout";
import { Grid, Search, Message } from "semantic-ui-react";
import logo from "../assets/logo.svg";

const SearchPage = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column>
        <img src={logo} alt="logo" style={{ minWidth: 450, padding: "4%" }} />

        <div class="ui center aligned grid">
          <div class="eight wide column">
            <Search
              color="blue"
              fluid
              size="massive"
              placeholder="Search modules or lecturers"
              input={{ fluid: true }}
            >
              <input type="text" />
            </Search>
          </div>
        </div>

        <Message style={{ marginBottom: "2em" }}>
          To preserve the safe space of this community, we ask that you do not
          personally identify or reveal any students from your reviews.
        </Message>
      </Grid.Column>
    </Grid>
  );
};
export default withLayout(SearchPage);
