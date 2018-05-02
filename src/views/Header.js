import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../resources/auth';
import { FootballIcon, CupIcon } from '../icons';

const Header = ({ full_name, logout }) => {
  return (
    <header>
      <div className="header-content">
        <div><Link to="dashboard"><FootballIcon size={40} /></Link></div>
        <div className="header-profile">
          <div>{full_name}</div>
          <div><Link to="leaderboard"><CupIcon size={40} /></Link></div>
        </div>
      </div>
    </header>
  );
}

export default connect(state => ({...state.user[state.auth.id]}), { logout, })(Header);
