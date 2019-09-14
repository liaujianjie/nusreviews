import * as React from "react";
import { 
  Grid,
  Progress,
} from "semantic-ui-react";

type Props = {
  ratings: Array<{name: string, value: number}>
}

const RatingCard = (props: Props) => {
  const { ratings } = props;
  return (
    <Grid stackable columns={2}>
      {
        ratings.map((rating: {name: string, value: number}) => 
          <Grid.Column>
            {rating.name}
            <Progress
              value={rating.value}
              total='5'
              progress='ratio'
              size='small'
              style={{ marginBottom: '0rem' }}
            />
          </Grid.Column>
        )
      }
    </Grid>
  )
};

export default RatingCard;
