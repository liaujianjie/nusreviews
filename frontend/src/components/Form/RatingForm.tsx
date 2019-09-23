import * as React from "react";
import * as FinalForm from "react-final-form";
import { Modal, Responsive } from "semantic-ui-react";
import { RadioGroupProps } from "./RadioButtonGroup";
import ActionButton from "../ActionButton";
import RatingPage from "./RatingPage";
import { RATING_QUESTIONS } from "../../constants/Form";
import * as _ from "lodash";

interface RatingFormProps {
  buttonName: string;
  modules: Array<moduleQuestion>;
  moduleName: string;
}

interface moduleQuestion {
  questions: Array<RadioGroupProps>;
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
          open={open}
          onClose={onClose}
          trigger={modalTrigger}
          style={{
            position: "unset",
            marginTop: "auto",
            margin: "auto",
            width: "80%"
          }} // margin doesn't cover marginTop for Modal Semantic UI
        >
          <RatingPage
            questions={questionSegment[pageNum]}
            onSubmit={onSubmit}
            onClose={onClose}
            questionsPerPage={questionsPerPage}
            moduleName={props.moduleName}
            lastPage={lastPage}
          />
        </Modal>
      </Responsive>
      <Responsive minWidth={700}>
        <Modal
          open={open}
          onClose={onClose}
          trigger={modalTrigger}
          style={{
            position: "unset",
            marginTop: "auto",
            margin: "auto",
            width: "36em"
          }} // margin doesn't cover marginTop for Modal Semantic UI
        >
          <RatingPage
            questions={questionSegment[pageNum]}
            onSubmit={onSubmit}
            onClose={onClose}
            questionsPerPage={questionsPerPage}
            moduleName={props.moduleName}
            lastPage={lastPage}
          />
        </Modal>
      </Responsive>
    </>
  );
};

export default RatingForm;

// export class Wizard extends React.Component {
//   static Page = ({ children }) => children;

//   constructor(props) {
//     super(props);
//     this.state = {
//       page: 0,
//       values: props.initialValues || {}
//     };
//   }
//   next = values =>
//     this.setState(state => ({
//       page: Math.min(state.page + 1, this.props.children.length - 1),
//       values
//     }));

//   previous = () =>
//     this.setState(state => ({
//       page: Math.max(state.page - 1, 0)
//     }));

//   /**
//    * NOTE: Both validate and handleSubmit switching are implemented
//    * here because 🏁 Redux Final Form does not accept changes to those
//    * functions once the form has been defined.
//    */

//   validate = values => {
//     const activePage = React.Children.toArray(this.props.children)[
//       this.state.page
//     ];
//     return activePage.props.validate ? activePage.props.validate(values) : {};
//   };

//   handleSubmit = values => {
//     const { children, onSubmit } = this.props;
//     const { page } = this.state;
//     const isLastPage = page === React.Children.count(children) - 1;
//     if (isLastPage) {
//       return onSubmit(values);
//     } else {
//       this.next(values);
//     }
//   };

//   render() {
//     const { children } = this.props;
//     const { page, values } = this.state;
//     const activePage = React.Children.toArray(children)[page];
//     const isLastPage = page === React.Children.count(children) - 1;
//     return (
//       <Form
//         initialValues={values}
//         validate={this.validate}
//         onSubmit={this.handleSubmit}
//       >
//         {({ handleSubmit, submitting, values }) => (
//           <form onSubmit={handleSubmit}>
//             {activePage}
//             <div className="buttons">
//               {page > 0 && (
//                 <button type="button" onClick={this.previous}>
//                   « Previous
//                 </button>
//               )}
//               {!isLastPage && <button type="submit">Next »</button>}
//               {isLastPage && (
//                 <button type="submit" disabled={submitting}>
//                   Submit
//                 </button>
//               )}
//             </div>

//             <pre>{JSON.stringify(values, 0, 2)}</pre>
//           </form>
//         )}
//       </Form>
//     );
//   }
// }
