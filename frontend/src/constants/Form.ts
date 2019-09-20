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

export const LECTURER_QUESTIONS = [
  {
    scale: 5,
    name: "lecturerGeneral",
    question: "How was your lecturer, Ben Leong?",
    value: ["Below Expectations", "Amazing"]
  },
  {
    scale: 5,
    name: "lecturerKnowledge",
    question: "Level of knowledge?",
    value: ["Poor", "Good"]
  },
  {
    scale: 5,
    name: "lecturerStyle",
    question: "Engaging teaching style?",
    value: ["Boring", "Engaging"]
  },
  {
    scale: 5,
    name: "lecturerEnergy",
    question: "Energy during the module?",
    value: ["Dull", "Passionate"]
  }
];

export const WORKLOAD_QUESTIONS = [
  {
    scale: 5,
    name: "workloadGeneral",
    question: "How was the workload (project, assignments)?",
    value: ["Chill", "Shag"]
  },
  {
    scale: 5,
    name: "workloadInteresting",
    question: "Was it interesting?",
    value: ["Boring", "Interesting"]
  },
  {
    scale: 5,
    name: "workloadRecommend",
    question: "Would you recommend this to me?",
    value: ["Avoid", "Recommend"]
  }
];

export const LONG_INPUT_QUESTIONS = [
  [
    {
      name: "lecturerInput",
      placeholder:
        "Tell me more maybe about the teaching style, energy during the module, attitude towards attendance...",
      question: "How was your lecturer Ben Leong?"
    },
    {
      name: "tutorInput",
      placeholder:
        "Tell me more maybe about the teaching style, energy during class, attitude towards attendance",
      question: "How's the tutor?"
    }
  ],
  [
    {
      name: "moduleInput",
      placeholder:
        "You could talk about what you generally learnt, took away from the module...",
      question: "What was the module about?"
    }
  ],
  [
    {
      name: "workloadInput",
      placeholder:
        "Maybe what preparation was needed for each class, time taken and effort needed for projects/assignments",
      question: "How was the workload (preparation, project, assignments)"
    },
    {
      name: "workloadProject",
      placeholder:
        "What were the deliverables for the project? How big was the team? Did you get to choose the team?",
      question: "What were the projects like?"
    },
    {
      name: "workloadQuiz",
      placeholder: "Tell me more about its format, preparation needed...",
      question: "How was the quizzes/exams?"
    }
  ],
  [
    {
      name: "interestInput",
      placeholder:
        "Anything memorable, anything that you enjoyed during classes...",
      question: "Was it interesting?"
    }
  ],
  [
    {
      name: "recommendInput",
      placeholder:
        "Who do you think would really enjoy and/or do well in this module?",
      question: "Would you recommend it to me?"
    }
  ]
];
