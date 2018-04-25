import React from 'react';
import { asyncConnect } from '../utils/components';

import { checkAuthentication } from '../resources/user';


const Auth = (props) => {
  return props.children;
}

export default asyncConnect(null, { load: checkAuthentication })(Auth);
