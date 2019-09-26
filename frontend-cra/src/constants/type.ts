export type METRIC_TYPE = {
  value: number;
  name: string;
  minValue: number;
  minDescription: string;
  maxValue: number;
  maxDescription: string;
};
export type METRICS_TYPE = Array<METRIC_TYPE>;

export type OPINION_TYPE = {
  description: string;
  opinionVotes: Array<number>;
  author: string;
  semester: string;
};
export type OPINIONS_TYPE = Array<OPINION_TYPE>;
export type TIP_TYPE = {
  description: string;
  tipVotes: Array<number>;
  author: string;
  semester: string;
};
export type TIPS_TYPE = Array<TIP_TYPE>;
export type QUESTION_TYPE = {
  id: number;
  createdAt: string;
  updatedAt: string;
  discardedAt: string;
  answer: string;
  questionTemplate: {
    id: number;
    createdAt: string;
    updatedAt: string;
    discardedAt: string;
    question: string;
    placeholder: string;
    compulsory: boolean;
    showInPreview: boolean;
  };
};
export type QUESTIONS_TYPE = Array<QUESTION_TYPE>;
export type REVIEW_TYPE = {
  expectedGrade: number;
  actualGrade: number;
  programmeYear: string;
  major: string;
  semester: string;
  preview: string;
  questions: QUESTIONS_TYPE;
  id: number;
};
export type REVIEWS_TYPE = Array<REVIEW_TYPE>;
export type SEMESTER_TYPE = {
  semester: number;
  academicYear: {
    academicYear: string;
  };
};
export type MODULE_SEMESTER_TYPE = {
  id: number;
  createdAt: string;
  updatedAt: string;
  examDate: string;
  examDuration: string;
  opinions: OPINIONS_TYPE;
  tips: TIPS_TYPE;
  reviews: REVIEWS_TYPE;
  semester: SEMESTER_TYPE;
};
export type MODULE_SEMESTERS_TYPE = Array<MODULE_SEMESTER_TYPE>;
export type MODULE_TYPE = {
  id: number;
  createdAt: string;
  updatedAt: string;
  moduleCode: string;
  title: string;
  description: string;
  moduleCredit: number;
  department: string;
  faculty: string;
  workload: Array<number>;
  prerequisite: string;
  corequisite: string;
  preclusion: string;
  moduleSemesters: MODULE_SEMESTERS_TYPE;
  metricAverages: {
    [key: string]: number;
  };
  metricTemplates: {
    [key: string]: METRIC_TYPE;
  };
};
