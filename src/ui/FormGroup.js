import React from 'react';
import { withClassNames } from './utils';


const FormGroup = ({label, className, children }) => {
  return (
    <div className={className}>
      {label ? <label>{label}</label> : null}
      {children}
    </div>
  );
}

export default withClassNames('form-group')(FormGroup);
