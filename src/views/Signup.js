import React from 'react';
import { connect } from 'react-redux';
import { withFormik, Field } from 'formik';
import { Link } from 'react-router-dom';

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
      <FormGroup label="Full name" hint="it will help your friends to find you.">
        <Field name="full_name" component={TextField} required={true} />
      </FormGroup>
      <FormGroup label="Email Address">
        <Field name="username" component={TextField} required={true} />
      </FormGroup>
      <FormGroup label="Password" hint="6 characters minimum">
        <Field name="password" component={TextField} type="password" required={true} />
      </FormGroup>
      <FormGroup label="Confirm Password">
        <Field name="confirm_password" component={TextField} type="password" required={true} />
      </FormGroup>
      <FormActions>
        <Button type="submit" submitting={isSubmitting}>Signup</Button>
      </FormActions>
    </FormSection>
    <div><Link to="/login">Already have an account?</Link></div>
  </form>
)


const mapPropsToValues = props => ({ full_name: '', username: '', password: '', confirm_password: ''});
const validate = (values, props) => {
  const errors = {};
  if (values.password.length < 6) {
    errors.password = 'Password need to be at least 6 characters long.';
  }
  if (values.confirm_password.length && values.password.length && values.password !== values.confirm_password) {
    errors.confirm_password = 'Confirmation password must match password.';
  }
  return errors;
};
const handleSubmit = (values, { props, setSubmitting, setErrors }) => {
  props.signup(values).then(response => {
    props.history.push('/dashboard');
  }).catch(error => {
    setErrors(error.response.data);
    setSubmitting(false);
  });
};

export default connect(null, { signup, })(withFormik({
  mapPropsToValues,
  validate,
  handleSubmit,
})(SignupForm));
