import React from "react";
import * as qs from "querystring";
import { RouteComponentProps } from 'react-router';

import { Spinner } from "@blueprintjs/core";

import { DetailSection } from "./DetailSection";
import { LongReviewSection } from "./LongReviewSection";
import { LongReview } from "./LongReviewSection/LongReview";

import * as reviewApi from "../../api/review";

import "./style.css";

type LONG_REVIEW_TYPE = {
  moduleSemester: {
    module: {
      moduleCode: string;
      title: string;
    }
    semester: {
      semester: number;
      academicYear: {
        academicYear: string,
      }
    }
  }
  questions: Array<{
    answer: string;
    questionTemplate: {
      question: string;
    }
  }>
  programmeYear: string;
  major: string,
  actualGrade: number,
  expectedGrade: number,
  metrics: Array<{
    value: number,
    metricTemplate: {
      name: string,
      minValue: 0,
      minDescription: string,
      maxValue: 0,
      maxDescription: string,
    }
  }>,
}

type METRIC_TYPE = {
  value: number,
  metricTemplate: {
    name: string,
    minValue: number,
    minDescription: string,
    maxValue: number,
    maxDescription: string,
  }
}

interface MyState {
  data: LONG_REVIEW_TYPE,
  loading: boolean,
}

interface MyOwnProps {
  match: {
    params: {
      moduleId: string
    }
  }
}

export class LongReviewPage extends React.Component<MyOwnProps & RouteComponentProps, MyState> {
  state = {
    loading: true,
    data: {} as LONG_REVIEW_TYPE,
  }

  componentWillMount() {
    const fetchData = async () => {
      const result = await reviewApi.getLongReview(this.props.match.params.moduleId);
      if (result.name === "Error") {
        this.props.history.push("/review-not-found");
      } else {
        this.setState({
          data: result,
          loading: false,
        });
      }
    };
    fetchData();
  }

  render() {
    if (this.state.loading) {
      return <div><br/><Spinner /></div>;
    }

    const { actualGrade, major, programmeYear, expectedGrade } = this.state.data;
    const ratings = this.state.data.metrics.map((entry: METRIC_TYPE) => {
      const {
        name,
        minValue,
        minDescription,
        maxValue,
        maxDescription
      } = entry.metricTemplate;
      return {
        value: entry.value,
        name,
        minValue,
        minDescription,
        maxValue,
        maxDescription
      };
    });
    const semester = `SEM ${this.state.data.moduleSemester.semester.semester}, AY${this.state.data.moduleSemester.semester.academicYear.academicYear}`
    const { moduleCode, title } = this.state.data.moduleSemester.module;
    const detailSectionProps = {
      moduleCode,
      title,
      semester,
      programmeYear,
      major,
    }
    const questions = this.state.data.questions.map(entry => ({
      question: entry.questionTemplate.question,
      answer: entry.answer,
    }));

    return (
      <div className="ReviewPage__container">
        <DetailSection {...detailSectionProps} ratings={ratings} />
        <LongReviewSection questions={questions} />
      </div>
    );
  };
}