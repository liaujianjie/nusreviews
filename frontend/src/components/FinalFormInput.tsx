import * as React from "react";
import { Form, Popup } from "semantic-ui-react";
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
    <Popup
      inverted
      on="focus"
      open={meta.dirty && meta.error && meta.active}
      trigger={<Form.Input {...otherProps} error={meta.dirty && meta.error} />}
      content={meta.error}
      position="right center"
    />
  );
};
