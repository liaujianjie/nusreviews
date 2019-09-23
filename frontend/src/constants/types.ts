export type RATINGS_TYPE = Array<{name: string, value: number}>
export type REVIEW_DETAIL_TYPE = {
  module_code: string,
  module_name: string,
  semester: string,
  student: string,
  actual: string,
  expected: string,
}
export type QUESTIONS_TYPE = Array<{question: string, description: string}>