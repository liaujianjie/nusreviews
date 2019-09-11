import React, { Component } from "react";
import { withLayout } from "../components/Layout";
import { Container } from "semantic-ui-react";

/* eslint-disable jsx-a11y/accessible-emoji */
import { Form, Field } from "react-final-form";


const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const App = () => {
  return ( <Form
      onSubmit={onSubmit}
      initialValues={{ stooge: 'larry', employed: false }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </form>
        )}
  );
}
