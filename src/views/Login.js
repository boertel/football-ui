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

import { login } from '../resources/auth';

const LoginForm = ({ values, handleSubmit, isSubmitting }) => (
  <form onSubmit={handleSubmit}>
    <FormSection>
      <FormGroup label="Email Address">
        <Field name="username" component={TextField} />
      </FormGroup>
      <FormGroup label="Password">
        <Field name="password" component={TextField} type="password" />
      </FormGroup>
      <FormActions>
        <Button type="submit" submitting={isSubmitting}>Login</Button>
      </FormActions>
    </FormSection>
  </form>
)


const mapPropsToValues = props => ({ username: 'benjamin.oertel@gmail.com', password: '12345'});

const handleSubmit = (values, { props, setSubmitting, setErrors }) => {
  props.login(values).then(response => {
    setSubmitting(false);
    const next = props.location.next || '/dashboard';
    props.history.push(next);
  });
};

const mapDispatchToProps ={ login, }

export default connect(null, mapDispatchToProps)(withFormik({
  mapPropsToValues,
  handleSubmit,
})(LoginForm));
