import React from 'react';
import { Link } from 'react-router-dom';
import { get, values } from 'lodash';

import { asyncConnect } from '../utils/components';
import { loadUser } from '../resources/user';
import { loadGames } from '../resources/games';
import Tasks from './Tasks';


const Dashboard = ({ first_name, }) => (
  <div>
    <Link to="/games">Go to the matches</Link>
    <Tasks />
  </div>
)

const mapStateToProps = state => ({
  refresh: !state.user[state.auth.id] || Object.keys(state.games).length === 0,
  games: state.games,
  first_name: get(state.user, [state.auth.id, 'full_name']),
})

export default asyncConnect(mapStateToProps, { load: [loadUser, loadGames] })(Dashboard)
