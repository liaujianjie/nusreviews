import * as React from "react";
import { Button } from "semantic-ui-react";
import FormModal from "./FormModal";
import ActionButton from "../ActionButton";
import * as FinalForm from "react-final-form";

interface ShortReviewProps {
  buttonName: string;
  name: string;
  placeholder: string;
  question: string;
}

export const ShortReview = (props: ShortReviewProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const { buttonName, ...formProps } = props;

  return (
    <FormModal
      open={showModal}
      formProps={formProps}
      onClose={() => setShowModal(false)}
    >
      <ActionButton
        onClick={() => setShowModal(true)}
        icon="plus"
        name={buttonName}
        transparent={false}
      />
    </FormModal>
  );
};

export default ShortReview;
