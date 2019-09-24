export const GRADES = [
  { key: "A+", text: "A+", value: "A+" },
  { key: "A", text: "A", value: "A" },
  { key: "A-", text: "A-", value: "A-" },
  { key: "B+", text: "B+", value: "B+" },
  { key: "B", text: "B", value: "B" },
  { key: "B-", text: "B-", value: "B-" },
  { key: "C+", text: "C+", value: "C+" },
  { key: "C", text: "C", value: "C" },
  { key: "C-", text: "C-", value: "C-" },
  { key: "D+", text: "D+", value: "D+" },
  { key: "D", text: "D", value: "D" },
  { key: "F", text: "F", value: "F" },
  { key: "S", text: "S", value: "S" },
  { key: "U", text: "U", value: "U" }
];

export const RATING_QUESTIONS = [
  {
    scale: 5,
    name: "worloadRating",
    question: "How as the workload?",
    label: ["Chill", "Shag"]
  },
  {
    scale: 5,
    name: "interestingRating",
    question: "Was it interesting?",
    label: ["Boring", "Interesting"]
  },
  {
    scale: 5,
    name: "recommendRating",
    question: "Would you recommend this module to me?",
    label: ["Avoid", "Recommend"]
  },
  {
    scale: 5,
    name: "oneRating",
    question: "question one",
    label: ["one", "two"]
  },
  {
    scale: 5,
    name: "twoRating",
    question: "question two",
    label: ["one", "two"]
  },
  {
    scale: 5,
    name: "threeRating",
    question: "question three",
    label: ["one", "two"]
  },
  {
    scale: 5,
    name: "fourRating",
    question: "question four",
    label: ["one", "two"]
  }
];

export const LECTURER_QUESTIONS = [
  {
    scale: 5,
    name: "lecturerGeneral",
    question: "How was your lecturer, Ben Leong?",
    label: ["Below Expectations", "Amazing"]
  },
  {
    scale: 5,
    name: "lecturerKnowledge",
    question: "Level of knowledge?",
    label: ["Poor", "Good"]
  },
  {
    scale: 5,
    name: "lecturerStyle",
    question: "Engaging teaching style?",
    label: ["Boring", "Engaging"]
  },
  {
    scale: 5,
    name: "lecturerEnergy",
    question: "Energy during the module?",
    label: ["Dull", "Passionate"]
  }
];

export const WORKLOAD_QUESTIONS = [
  {
    scale: 5,
    name: "workloadGeneral",
    question: "How was the workload (project, assignments)?",
    label: ["Chill", "Shag"]
  },
  {
    scale: 5,
    name: "workloadInteresting",
    question: "Was it interesting?",
    label: ["Boring", "Interesting"]
  },
  {
    scale: 5,
    name: "workloadRecommend",
    question: "Would you recommend this to me?",
    label: ["Avoid", "Recommend"]
  }
];

export const SHORT_REVIEW_TIPS = {
  name: "shortReviewTip",
  placeholder:
    "Are the lecturers worth going for/how much time should I take to prepare for tutorials...",
  question: "What are some tips for doing well in this module?"
};

export const SHORT_REVIEW_OPINION = {
  name: "shortReviewOpinion",
  placeholder:
    "Tell me more maybe about the teaching style, energy during the module, attitude towards attendance...",
  question: "What were the best parts of the module?"
};
