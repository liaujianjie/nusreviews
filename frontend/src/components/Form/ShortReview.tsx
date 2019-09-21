import * as React from "react";
import { Button } from "semantic-ui-react";
import FormModal from "./FormModal";
import ActionButton from "../ActionButton";
import * as FinalForm from "react-final-form";

export const ShortReview = props => {
  const [showModal, setShowModal] = React.useState(false);

  const onSubmit = values => {
    window.alert("Form submitted!" + JSON.stringify(values, 0, 2));
    setShowModal(false);
  };

  const formParams = {
    name: "shortModuleInput",
    placeholder:
      "Tell me more maybe about the teaching style, energy during the module, attitude towards attendance...",
    question: "What were the best parts of the module?"
  };

  return (
    <FinalForm.Form onSubmit={onSubmit}>
      {({ handleSubmit, values, form }) => (
        <FormModal
          open={showModal}
          formParams={formParams}
          size="tiny"
          onClose={() => setShowModal(false)}
          onSubmit={e => {
            handleSubmit(values);
            form.reset();
          }}
          value={values.shortModuleInput}
        >
          <ActionButton
            onClick={(e, data) => setShowModal(true)}
            icon="plus"
            name={props.name}
            transparent={false}
          />
        </FormModal>
      )}
    </FinalForm.Form>
  );
};

export default ShortReview;
