import * as React from "react";
import { Modal, Button } from "semantic-ui-react";
import LongTextInput from "./LongTextInput";
import * as FinalForm from "react-final-form";
import ActionButton from "../ActionButton";

export const FormModal = props => {
  const { open, formParams, onClose, onSubmit, value, size } = props;

  const { question, ...longParams } = formParams;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="tiny"
      trigger={props.children}
      style={{ top: "30%" }}
    >
      <Modal.Header>{question}</Modal.Header>
      <Modal.Content>
        <LongTextInput {...longParams} value={value} />
      </Modal.Content>
      <Modal.Actions>
        <ActionButton onClick={onClose} name="Cancel" transparent={true} />
        <ActionButton
          onClick={onSubmit}
          name="Add Opinion"
          transparent={false}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default FormModal;
