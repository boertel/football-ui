import React from 'react';
import { sortBy } from 'lodash';

import { asyncConnect } from '../utils/components';
import { loadUsers } from '../resources/user';
import { withClassNames } from '../ui/utils';


const User = withClassNames('user')(({ className, rank, full_name, points, me }) => (
  <div className={`${className}${me ? ' me' : ''}`}>
    <div className="full-name">{rank}. {full_name}</div>
    <div className="points">{points}</div>
  </div>
))

const Leaderboard = ({ users, currentUserId }) => {
  const leaderboard = sortBy(users, 'points');
  let rank = 1;
  let previousPoints = 0;
  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <div>
        {leaderboard.map(({ id, full_name, points }) => {
          if (points !== previousPoints) {
            rank += 1;
          }
          previousPoints = points;
          const me = currentUserId === id;
          return <User key={id} full_name={full_name} points={points} rank={rank} me={me} />
        })}
      </div>
    </div>
  );
}

export default asyncConnect(state => ({ users: state.user, currentUserId: state.auth.id, }), { load: loadUsers })(Leaderboard);
