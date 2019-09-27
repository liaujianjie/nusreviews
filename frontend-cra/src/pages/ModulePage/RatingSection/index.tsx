import React from "react";
import _ from "lodash";

import { SplitColumns } from "../../../components/SplitColumns";
import { Section } from "../Section";
import { AttributeRating } from "./AttributeRating";
import { RatingModal } from "../RatingModal/index";
import { getQuestions, Metric } from "../../../api/review";

import "./style.css";

type OwnProps = {
  ratings: React.ComponentProps<typeof AttributeRating>[];
};

export const RatingSection: React.FunctionComponent<OwnProps> = ({
  ratings
}) => {
  const [metrics, setMetrics] = React.useState<Metric[]>([]);

  React.useEffect(() => {
    const fetchQuestions = async () => {
      const payload = await getQuestions();
      const { metricTemplates } = payload;
      setMetrics(metricTemplates);
    };
    fetchQuestions();
  }, []);

  return (
    <Section
      leftHeader={
        <h4 className="RatingSection__left-header">Overall Ratings</h4>
      }
      rightHeader={
        <RatingModal
          buttonName="Add Rating"
          moduleCode="CS3216"
          metrics={metrics}
        />
      }
      body={
        <SplitColumns>
          {_.map(ratings, rating => (
            <AttributeRating {...rating} />
          ))}
        </SplitColumns>
      }
    />
  );
};
