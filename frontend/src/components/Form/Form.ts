interface BasicFormProps {
  name: string;
  value?: string | number;
  label?: string;
  question: string;
}

export interface RadioButtonProps {
  name: string;
  value?: string | number;
}

export interface TextInputProps extends BasicFormProps {
  placeholder: string;
}
export interface ShortTextInputProps extends TextInputProps {}

export interface LongTextInputProps extends TextInputProps {
  rows?: number;
}

interface DropDownOptionObj {
  key: string;
  value: string;
  text: string;
}

export interface DropDownProps extends BasicFormProps {
  options: Array<DropDownOptionObj>;
  placeholder: string;
}

export type LongFormReviewInput = {
  test: string;
  expectedGrade: string;
  actualGrade: string;
  name: string;
  lecturerInput: string;
  tutorInput: string;
  realName: string;
};
