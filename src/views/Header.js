import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../resources/user';

const Header = (props) => {
  return (
    <header>
      <a onClick={props.logout}>Logout</a>
    </header>
  );
}

export default connect(null, { logout, })(Header);
