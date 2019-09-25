import * as React from "react";
import * as FinalForm from "react-final-form";

interface FormValues {
  shortReviewOpinion?: string;
  shortReviewTip?: string;
}

interface ShortReviewProps {
  buttonName: string;
  name: string;
  placeholder: string;
  question: string;
}

export const ShortReview: React.FunctionComponent<ShortReviewProps> = props => {
  const [open, setOpen] = React.useState(false);
  const { buttonName, question, ...formProps } = props;

  const wordLimit = 300;

  const onClose = () => setOpen(false);

  const onSubmit = (values: FormValues) => {
    window.alert("Form submitted!" + JSON.stringify(values));
    onClose();
  };

  // const formValidation = (values: FormValues) => {
  //   const errors = {};
  //   const currentWords = values[formProps.name]; // done like this for the two different shortReviews
  //   if (currentWords && currentWords.length > wordLimit) {
  //     errors[formProps.name] = `only ${wordLimit} characters pls`;
  //   }
  //   return errors;
  // };

  return (
    <div />
    // <FinalForm.Form onSubmit={onSubmit} validate={formValidation}>
    //   {({ values, invalid, form, pristine }) => {
    //     const formValue = values[formProps.name];
    //     return <div />;
    //   }}
    // </FinalForm.Form>
  );
};

export default ShortReview;
