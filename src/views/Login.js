import React from 'react';
import { connect } from 'react-redux';
import { withFormik, Field } from 'formik';
import { Link } from 'react-router-dom';

import {
  FormSection,
  FormGroup,
  FormActions,
  Button,
  Error,
} from '../ui';

import {
  TextField,
} from '../fields';

import { login } from '../resources/auth';

const LoginForm = ({ values, handleSubmit, isSubmitting, errors }) => (
  <form onSubmit={handleSubmit}>
    <FormSection>
      {errors.form && <Error>{errors.form}</Error>}
      <FormGroup label="Email Address">
        <Field name="username" component={TextField} required={true} />
      </FormGroup>
      <FormGroup label="Password">
        <Field name="password" component={TextField} type="password" required={true} />
      </FormGroup>
      <FormActions>
        <Button type="submit" submitting={isSubmitting}>Login</Button>
      </FormActions>
    </FormSection>
    <div>or <Link to="/signup">Create an account</Link></div>
  </form>
)


const mapPropsToValues = props => ({ username: '', password: ''});

const handleSubmit = (values, { props, setSubmitting, setErrors }) => {
  props.login(values).then(response => {
    if (response.data.ok !== 'false') {
      setSubmitting(false);
      const next = props.location.next || '/dashboard';
      props.history.push(next);
    } else {
      setErrors({'form': 'Email Address and/or Password are incorrect. Please try again.'})
      setSubmitting(false);
    }
  });
};

const mapDispatchToProps ={ login, }

export default connect(null, mapDispatchToProps)(withFormik({
  mapPropsToValues,
  handleSubmit,
})(LoginForm));
