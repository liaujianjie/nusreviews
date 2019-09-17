import * as React from "react";
import { Form, Message } from "semantic-ui-react";
import { FieldRenderProps } from "react-final-form";

interface FinalFormInputProps
  extends Omit<React.ComponentProps<typeof Form.Input>, "input">,
    FieldRenderProps<string, HTMLInputElement> {}

/**
 * A Semantic UI `Form.Input` component wrapped to support React Final Form.
 */
export const FinalFormInput: React.FunctionComponent<
  FinalFormInputProps
> = props => {
  const { meta, ...otherProps } = props;
  return (
    <>
      <Form.Input {...otherProps} error={meta.dirty && meta.error} />
      {meta.dirty && <Message error content={meta.error} />}
    </>
  );
};
