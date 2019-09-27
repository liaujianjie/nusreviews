import React from "react";
import * as qs from "querystring";
import { RouteComponentProps } from "react-router";

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
  OPINION_TYPE,
  OPINIONS_TYPE,
  TIP_TYPE,
  TIPS_TYPE,
  REVIEWS_TYPE,
  REVIEW_TYPE,
  MODULE_SEMESTER_TYPE,
} from "../../constants/type";

import "./style.css";

interface MyState {
  data: MODULE_TYPE;
  semesters: Set<string>;
  loading: boolean;
}

interface MyProps {
  match: {
    params: {
      moduleId: string;
    };
  };
}

export class ModulePage extends React.Component<
  MyProps & RouteComponentProps,
  MyState
> {
  state = {
    loading: true,
    semesters: new Set(""),
    data: {} as MODULE_TYPE
  };

  componentWillMount() {
    const fetchData = async () => {
      const result = await moduleApi.getModule(
        this.props.match.params.moduleId
      );
      if (result.name === "Error") {
        this.props.history.push("/module-not-found");
      } else {
        this.setState(
          {
            data: result,
            loading: false
          },
          () => {
            this.setState({
              semesters: new Set(this.getAllSemesters())
            });
          }
        );
      }
    };
    fetchData();
  }

  filterDataBySemester() {
    let result = {
      opinions: [] as OPINIONS_TYPE,
      tips: [] as TIPS_TYPE,
      reviews: [] as REVIEWS_TYPE
    };
    this.state.data.moduleSemesters.forEach(element => {
      const semester = `SEM ${element.semester.semester}, AY${element.semester.academicYear.academicYear}`;
      if (this.state.semesters.has(semester)) {
        element.opinions.forEach((opinion: OPINION_TYPE) =>
          result.opinions.push({
            ...opinion,
            semester
          })
        );
        element.tips.forEach((tip: TIP_TYPE) =>
          result.tips.push({
            ...tip,
            semester
          })
        );
        element.reviews.forEach((review: REVIEW_TYPE) => {
          const { programmeYear, major, expectedGrade, actualGrade } = review;
          let preview = "";
          for (let i = 0; i < review.questions.length; i++) {
            preview += `Q: ${review.questions[i].questionTemplate.question} A: ${review.questions[i].answer}. `;
            if (preview.length >= 500) break;
          }
          preview = preview.substr(0, 500) + "...";
          result.reviews.push({
            semester,
            preview,
            programmeYear,
            major,
            expectedGrade,
            actualGrade,
            questions: review.questions,
            id: review.id
          });
        });
      }
    });
    return result;
  }

  toggleSemester(semester: string) {
    let newSemesters = new Set(this.state.semesters);
    if (newSemesters.has(semester)) {
      newSemesters.delete(semester);
    } else {
      newSemesters.add(semester);
    }
    this.setState({
      semesters: newSemesters
    });
  }

  getAllSemesters() {
    return this.state.data.moduleSemesters.map(
      element =>
        `SEM ${element.semester.semester}, AY${element.semester.academicYear.academicYear}`
    );
  }

  getLastestSemester() {
    const mS: MODULE_SEMESTER_TYPE = this.state.data.moduleSemesters[this.state.data.moduleSemesters.length - 1];
    return mS.id;
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          <br />
          <Spinner />
        </div>
      );
    }
    const { moduleCode, title, description } = this.state.data;
    const { opinions, tips, reviews } = this.filterDataBySemester();

    const toggleSemesterCheckbox = (semester: string) =>
      this.toggleSemester(semester);
    const detailSectionProps = {
      moduleCode,
      title,
      description,
      allSemesters: this.getAllSemesters(),
      toggleSemesterCheckbox,
      semesters: this.state.semesters
    };
    const discussionSectionProps = {
      opinions,
      tips
    };
    let ratings: METRICS_TYPE = [];
    Object.keys(this.state.data.metricTemplates).forEach(entry => {
      const {
        name,
        minValue,
        minDescription,
        maxValue,
        maxDescription
      } = this.state.data.metricTemplates[entry];
      ratings.push({
        value: this.state.data.metricAverages[entry],
        name,
        minValue,
        minDescription,
        maxValue,
        maxDescription
      });
    });

    return (
      <RequiresAuth>
        <div className="ModulePage__container">
          <DetailSection {...detailSectionProps} />
          <RatingSection ratings={ratings} msId={this.getLastestSemester()} moduleCode={moduleCode}/>
          <DiscussionSection {...discussionSectionProps} msId={this.getLastestSemester()} />
          <LongReviewSection reviews={reviews} msId={1} />
        </div>
      </RequiresAuth>
    );
  }
}
