export interface RadioButtonProps extends BasicFormProps {}

export interface TextInputProps extends BasicFormProps {
  placeholder: string;
  children: string;
}
export interface ShortTextInputProps extends TextInputProps {}

export interface LongTextInputProps extends TextInputProps {
  height?: number;
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
  name: string;
  description: string;
  realName: string;
};
