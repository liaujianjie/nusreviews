import * as React from "react";
import { Header, Image, Grid, GridColumn } from "semantic-ui-react";
import { withLayout } from "../components/Layout";
import monkey from "../static/images/monkey.png";
import noise from "../static/audio/monkeysound.mp3";

const NotFoundPage = () => (
  <Grid
    centered
    verticalAlign="middle"
    style={{
      minHeight: "700px"
    }}
  >
    <Grid.Column>
      <Grid.Row style={{ textAlign: "center" }}>
        <div class="four width column">
          <Image src={monkey} size="large" centered />
          <audio autoplay="autoplay">
            <source src={noise} />
          </audio>
        </div>
      </Grid.Row>
    </Grid.Column>
  </Grid>
);

export default withLayout(NotFoundPage);
