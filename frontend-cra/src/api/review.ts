import { sharedHttpClient } from "./sharedHttpClient";
import * as qs from "querystring";

export interface Metric {
  name: string;
  minValue: number;
  maxValue: number;
  minDescription: string;
  maxDescription: string;
  compulsory: boolean;
}

interface Question {
  question: string;
  placeholder: string;
  compulsory: boolean;
}
interface QuestionsResults {
  metricTemplates: Array<Metric>;
  questionTemplates: Array<Question>;
}

export const getQuestions = async (
  reviewId: number,
  type: string
): Promise<QuestionsResults> => {
  const response = await sharedHttpClient.get(`/review_templates/${reviewId}`);
  return response.data;
};

export const postQuestions = (moduleId: number, payload: any) => {
  console.log("posting", payload);
  return sharedHttpClient.post(`/module_semesters/${moduleId}/reviews`, {
    params: {
      ...payload
    }
  });
};

export const postOpinion = (moduleId: number, payload: any) => {
  console.log("posting opinion", payload);
  return sharedHttpClient.post(
    `/module_semesters/${moduleId}/opinions`,
    qs.stringify({
      params: {
        description: "some opinion"
      }
    })
  );
};

export const reviewTemplate = {
  metricTemplates: [
    {
      name: "How was the your lecturer?",
      compulsory: true,
      minValue: 1,
      minDescription: "Deficient	",
      maxValue: 5,
      maxDescription: "Amazing"
    },
    {
      name: "Level of Knowledge?",
      compulsory: true,
      minValue: 1,
      minDescription: "Poor",
      maxValue: 5,
      maxDescription: "Good"
    },
    {
      name: "Engaging teaching style?",
      compulsory: true,
      minValue: 1,
      minDescription: "Boring",
      maxValue: 5,
      maxDescription: "Engaging"
    },
    {
      name: "Energy during the module?",
      compulsory: true,
      minValue: 1,
      minDescription: "Dull",
      maxValue: 5,
      maxDescription: "Passionate"
    },
    {
      name: "How was the workload (project, assignments)",
      compulsory: true,
      minValue: 1,
      minDescription: "Poor",
      maxValue: 5,
      maxDescription: "Good"
    },
    {
      name: "Was it interesting?",
      compulsory: true,
      minValue: 1,
      minDescription: "Boring",
      maxValue: 5,
      maxDescription: "Interesting"
    },
    {
      name: "Would you recommend this to me?",
      compulsory: true,
      minValue: 1,
      minDescription: "Avoid",
      maxValue: 5,
      maxDescription: "Recommend"
    }
  ],
  questionTemplates: [
    {
      question: "How was your lecturer?",
      compulsory: false,
      placeholder:
        "You could talk about what you generally learnt, took away from the module"
    },
    {
      question:
        "How was the project workload (preparation, project, assignments)?",
      compulsory: false,
      placeholder:
        "Maybe what preparation (like readings/research) were needed for each class, time taken and effort needed for any projects or assignments"
    },
    {
      question: "How's the tutors?",
      compulsory: false,
      placeholder:
        "Tell me more maybe about the teaching style, attendance counts?"
    },
    {
      question: "What was the module about?",
      compulsory: false,
      placeholder: "You could talk about what you generally learnt"
    },
    {
      question: "How was the workload (preparation, project, assignments)?",
      compulsory: false,
      placeholder:
        "How many readings/research was needed for each class, time taken and effort for any projects/assignments..."
    },
    {
      question: "What was the project/assignemnt?",
      compulsory: false,
      placeholder: "the topic, the scope, can you choose your teammates"
    },
    {
      question: "How was the quizzes/exams",
      compulsory: false,
      placeholder:
        "Tell me more about its format(mcq, structured), open/close-book, preparations..."
    },
    {
      question: "Was it interesting?",
      compulsory: false,
      placeholder:
        "Anything memorable, anything that you enjoyed during classess..."
    },
    {
      question: "Would you recommend it to me?",
      compulsory: false,
      placeholder:
        "Who do you think would really enjoy and/or do well in this module?"
    }
  ]
};
