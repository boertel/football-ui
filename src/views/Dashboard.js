import React from 'react';
import { get, values } from 'lodash';

import { asyncConnect } from '../utils/components';
import { loadUser } from '../resources/user';
import { loadGames } from '../resources/games';
import Tasks from './Tasks';
import NextGame from './NextGame';
import CurrentGames from './CurrentGames';



const Dashboard = ({ first_name, }) => (
  <div>
    <h1>Hi!</h1>

    <CurrentGames />
    <NextGame />

    <Tasks />
  </div>
)

const mapStateToProps = state => ({
  refresh: !state.user[state.auth.id],
  first_name: get(state.user, [state.auth.id, 'full_name']),
})

export default asyncConnect(mapStateToProps, { load: [loadUser, loadGames] })(Dashboard)
