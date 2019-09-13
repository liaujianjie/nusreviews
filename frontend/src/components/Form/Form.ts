export interface RadioButtonProps extends BasicFormProps {}

export interface ShortTextInputProps extends BasicFormProps {
  placeholder: string;
}

interface BasicFormProps {
  name: string;
  value?: string | number;
  children?: any;
  label?: string;
}

export type LongFormReviewInput = {
  test: string;
  expectedGrade: string;
  actualGrade: string;
};
