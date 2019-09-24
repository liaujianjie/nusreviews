import * as React from "react";
import { Modal, Responsive } from "semantic-ui-react";
import ActionButton from "../ActionButton";
import RatingPage from "./RatingPage";
import { RATING_QUESTIONS } from "../../constants/Form";
import * as _ from "lodash";

interface RatingFormProps {
  buttonName: string;
  moduleName: string;
}

export const RatingForm: React.FunctionComponent<RatingFormProps> = props => {
  const [open, setOpen] = React.useState(false);
  const [pageNum, setPageNum] = React.useState(0);

  const questionsPerPage = 4;

  const lastPage =
    Math.ceil(RATING_QUESTIONS.length / questionsPerPage) === pageNum + 1;

  const questionSegment = _.chunk(RATING_QUESTIONS, questionsPerPage);

  const onClose = () => setOpen(false);
  const nextPage = () => setPageNum(pageNum + 1);

  const onSubmit = () => {
    lastPage ? onClose() : nextPage();
  };

  const modalTrigger = (
    <ActionButton
      onClick={() => setOpen(true)}
      icon="plus"
      name="Add Rating"
      transparent={false}
    />
  );

  return (
    <>
      <Responsive maxWidth={700}>
        <Modal
          className="scrolling"
          open={open}
          onClose={onClose}
          trigger={modalTrigger}
          style={{
            position: "unset",
            marginTop: "auto",
            margin: "auto",
            width: "80%"
          }} // margin doesn't cover marginTop for Modal Semantic UI
          // modal out of the box doesn't seem to do centering right on our page
        >
          <RatingPage
            questions={questionSegment[pageNum]}
            onSubmit={onSubmit}
            onClose={onClose}
            moduleName={props.moduleName}
            lastPage={lastPage}
          />
        </Modal>
      </Responsive>
      <Responsive minWidth={700}>
        <Modal
          className="scrolling"
          open={open}
          onClose={onClose}
          trigger={modalTrigger}
          style={{
            position: "unset",
            marginTop: "auto",
            margin: "auto",
            width: "36em"
          }}
        >
          <RatingPage
            questions={questionSegment[pageNum]}
            onSubmit={onSubmit}
            onClose={onClose}
            moduleName={props.moduleName}
            lastPage={lastPage}
          />
        </Modal>
      </Responsive>
    </>
  );
};

export default RatingForm;
