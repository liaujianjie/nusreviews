import React from "react";
import { RequiresAuth } from "../../components/RequiresAuth";

import { Spinner } from "@blueprintjs/core";

import { DetailSection } from "./DetailSection";
import { RatingSection } from "./RatingSection";
import { DiscussionSection } from "./DiscussionSection";
import { LongReviewSection } from "./LongReviewSection";

import * as moduleApi from "../../api/module";
import {
  MODULE_TYPE,
  METRICS_TYPE,
  REVIEWS_TYPE,
  REVIEW_TYPE
} from "../../constants/type";

import "./style.css";

export const ModulePage: React.FunctionComponent = () => {
  const [data, setData] = React.useState({} as MODULE_TYPE);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await moduleApi.getModule("CS2030");
      setData(result);
    };
    fetchData();
  }, []);

  if (!Object.keys(data).length) {
    return <Spinner />;
  }

  const { moduleCode, title, description } = data;
  // TODO: Merge all semesters when no filter is given
  const { opinions, tips, reviews } = data.moduleSemesters[0];
  // TODO: Remove when API is updated
  data.moduleSemesters[0].semester = {
    semester: 1,
    academicYear: {
      academicYear: "2019-2020"
    }
  };
  let semesterData = data.moduleSemesters[0].semester;
  let semester = `SEM ${semesterData.semester}, AY${semesterData.academicYear.academicYear}`;

  const detailSectionProps = {
    moduleCode,
    title,
    description
  };
  const discussionSectionProps = {
    opinions,
    tips
  };
  let ratings: METRICS_TYPE = [];
  // TODO: remove when the API is updated
  data.metricAverages = {
    "1": 1,
    "2": 5
  };
  Object.keys(data.metricTemplates).forEach(entry => {
    const {
      name,
      minValue,
      minDescription,
      maxValue,
      maxDescription
    } = data.metricTemplates[entry];
    ratings.push({
      value: data.metricAverages[entry],
      name,
      minValue,
      minDescription,
      maxValue,
      maxDescription
    });
  });
  // TODO: fix empty year/major
  // TODO: convert grade to letter
  let reviewEntries: REVIEWS_TYPE = [];
  reviews.forEach((entry: REVIEW_TYPE) => {
    const { programmeYear, major, expectedGrade, actualGrade } = entry;
    let preview = "";
    for (let i = 0; i < entry.questions.length; i++) {
      preview += `Q: ${entry.questions[i].questionTemplate.question} A: ${entry.questions[i].answer}. `;
      if (preview.length >= 200) break;
    }
    preview = preview.substr(0, 200);
    reviewEntries.push({
      semester,
      preview,
      programmeYear,
      major,
      expectedGrade,
      actualGrade,
      questions: entry.questions
    });
  });

  return (
    <RequiresAuth>
      <div className="ModulePage__container">
        <DetailSection {...detailSectionProps} />
        <RatingSection ratings={ratings} />
        <DiscussionSection {...discussionSectionProps} />
        <LongReviewSection reviews={reviewEntries} />
      </div>
    </RequiresAuth>
  );
};
