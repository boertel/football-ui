import React from 'react';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import { asyncConnect } from '../utils/components';
import { loadUser } from '../resources/user';
import { loadGames } from '../resources/games';
import Tasks from './Tasks';


const Dashboard = ({ first_name }) => (
  <div>
    <h1>Hi {first_name}!</h1>
    <Link to="/games">Games</Link>
    <Tasks />
  </div>
)

const mapStateToProps = state => ({
  refresh: !state.user[state.auth.id],
  first_name: get(state.user, [state.auth.id, 'full_name']),
})

export default asyncConnect(mapStateToProps, { load: [loadUser, loadGames] })(Dashboard)
