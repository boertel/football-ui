import React from 'react';
import { connect } from 'react-redux';
import { withFormik, Field } from 'formik';

import {
  FormSection,
  FormGroup,
  FormActions,
  Button,
} from '../ui';

import {
  TextField,
} from '../fields';

import { signup } from '../resources/auth';



const SignupForm = ({ values, handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <FormSection>
      <FormGroup label="Full name">
        <Field name="full_name" component={TextField} />
      </FormGroup>
      <FormGroup label="Email Address">
        <Field name="username" component={TextField} />
      </FormGroup>
      <FormGroup label="Password">
        <Field name="password" component={TextField} type="password" />
      </FormGroup>
      <FormGroup label="Confirm Password">
        <Field name="confirm_password" component={TextField} type="password" />
      </FormGroup>
      <FormActions>
        <Button type="submit" submitting={isSubmitting}>Signup</Button>
      </FormActions>
    </FormSection>
  </form>
)


const mapPropsToValues = props => ({ first_name: '', username: '', password: '', confirm_password: ''});
const validate = (values, props) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (values.confirm_password.length && values.password.length && values.password !== values.confirm_password) {
    errors.confirm_password = 'Confirmation password must match password.';
  }
  return errors;
};
const handleSubmit = (values, { props, setSubmitting, setErrors }) => {
  props.signup(values).then(response => {
    props.history.push('/dashboard');
  });
};

export default connect(null, { signup, })(withFormik({
  mapPropsToValues,
  validate,
  handleSubmit,
})(SignupForm));
