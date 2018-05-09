import React from 'react';
import { Link } from 'react-router-dom';

import { asyncConnect } from '../utils/components';
import { logout } from '../resources/auth';
import { loadUser } from '../resources/user';
import { FootballIcon, CupIcon } from '../icons';

const Header = ({ full_name, points, logout }) => {
  return (
    <header>
      <div className="header-content">
        <div><Link to="/dashboard" title="Go to dashboard"><FootballIcon size={40} /></Link></div>
        <div className="header-profile">
          <div><Link to="/profile" title="Go to my profile">{full_name} { points !== 0 ? `(${points} points)` : null}</Link></div>
          <div><Link to="/leaderboard" title="Go to leadeboard"><CupIcon size={40} /></Link></div>
        </div>
      </div>
    </header>
  );
}

export default asyncConnect(state => ({...state.user[state.auth.id], refresh: state.user[state.auth.id] === undefined}), { logout, load: loadUser, }, { loader: null })(Header);
