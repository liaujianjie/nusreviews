import * as React from "react";
import { Form, TextAreaProps, Grid } from "semantic-ui-react";
import { DropDownProps } from "./Form";

import { Field } from "react-final-form";

const DropDown: React.FunctionComponent<DropDownProps> = props => {
  return (
    <Field {...props} component="select">
      {fieldProps => {
        const { input } = fieldProps;
        const handleChange = (
          event: React.FormEvent<HTMLTextAreaElement>,
          eventData: TextAreaProps
        ) => {
          const defaultEvent = { target: eventData };
          input.onChange(defaultEvent);
        };

        const { children, ...neededProps } = props;

        return (
          <Grid.Column width={4}>
            <Form.Select
              style={{ minWidth: "7em", maxWidth: "9em" }}
              {...neededProps}
              label={{
                children: props.label,
                htmlFor: `form-select-control-${props.name}`
              }}
              onChange={handleChange}
              search
              searchInput={{ id: `form-select-control-${props.name}` }}
            />
          </Grid.Column>
        );
      }}
    </Field>
  );
};

export default DropDown;
