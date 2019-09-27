export const GRADE = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "D+",
  "D",
  "F",
  "S",
  "U"
];


export const GRADES_TO_INT = (
  grade:
    | "A+"
    | "A"
    | "A-"
    | "B+"
    | "B"
    | "B-"
    | "C+"
    | "C"
    | "C-"
    | "D+"
    | "D"
    | "F"
    | "S"
    | "U"
) => {
  const trans = {
    "A+": 0,
    A: 1,
    "A-": 2,
    "B+": 3,
    B: 4,
    "B-": 5,
    "C+": 6,
    C: 7,
    "C-": 8,
    "D+": 9,
    D: 10,
    F: 11,
    S: 12,
    U: 13
  };
  return trans[grade];
};
